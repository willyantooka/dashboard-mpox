import { useEffect, useState } from "react";
import { API, MAX_PAGINAS, limpar } from "../dados";

export function useMpox() {
  const [todos, setTodos] = useState([]);
  const [msg, setMsg] = useState("Preparando…");

  useEffect(() => {
    let cancelado = false;
    (async () => {
      const acc = [];
      try {
        for (let p = 0; p < MAX_PAGINAS && !cancelado; p++) {
          setMsg(`Baixando página ${p + 1}… (${acc.length} registros)`);
          const r = await fetch(`${API}?limit=1000&offset=${p}`);
          const lote = (await r.json()).mpox ?? [];
          acc.push(...lote.map(limpar));
          if (lote.length < 1000) break;
        }
        if (cancelado) return;
        setTodos(acc);
        setMsg(`${acc.length.toLocaleString("pt-BR")} registros carregados` + (acc.length >= MAX_PAGINAS * 1000 ? " (TRUNCADO)" : " (base completa)"));
      } catch (e) {
        if (!cancelado) setMsg("Erro ao carregar: " + e.message);
      }
    })();
    return () => { cancelado = true; };
  }, []);

  return { todos, msg };
}