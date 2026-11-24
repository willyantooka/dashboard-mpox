import { useMemo, useState } from "react";
import { useMpox } from "./hooks/useMpox";
import { CODIGOS, rotulo } from "./dados";
import { media, mediana, desvio } from "./estatistica";
import { indicadores, porMes, topUfs, statsSexo, cruzamento, resumoAnos } from "./calculos";
import Grafico from "./components/Grafico";
import Filtro from "./components/Filtro";
import Conclusao from "./components/Conclusao";

export default function App() {
  const { todos, msg } = useMpox();
  const [f, setF] = useState({ uf: "", sexo: "", ano: "", classi: "" });
  const muda = k => v => setF(antes => ({ ...antes, [k]: v }));

  const op = useMemo(() => {
    const l = k => [...new Set(todos.map(d => d[k]))].sort();
    return { uf: l("uf"), sexo: l("sexo"), ano: l("ano"), classi: l("classi") };
  }, [todos]);

  const dados = useMemo(() => todos.filter(d => (!f.uf || d.uf === f.uf) && (!f.sexo || d.sexo === f.sexo) &&
    (!f.ano || d.ano === f.ano) && (!f.classi || d.classi === f.classi)), [todos, f]);

  const ind = useMemo(() => indicadores(dados), [dados]);
  const mes = useMemo(() => porMes(dados), [dados]);
  const ufs = useMemo(() => topUfs(dados), [dados]);
  const sexo = useMemo(() => statsSexo(dados), [dados]);
  const cruz = useMemo(() => cruzamento(dados), [dados]);
  const anos = useMemo(() => resumoAnos(todos, f.uf, f.sexo), [todos, f.uf, f.sexo]);

  return (
    <div className="app">
      <aside>
        <h2>Filtros</h2>
        <Filtro titulo="UF de notificação" valor={f.uf} onChange={muda("uf")} lista={op.uf} />
        <Filtro titulo="Sexo" valor={f.sexo} onChange={muda("sexo")} lista={op.sexo} nome={v => rotulo(CODIGOS.sexo, v)} />
        <Filtro titulo="Ano da notificação" valor={f.ano} onChange={muda("ano")} lista={op.ano} />
        <Filtro titulo="Classificação final" valor={f.classi} onChange={muda("classi")} lista={op.classi} nome={v => rotulo(CODIGOS.classi, v)} />
      </aside>

      <main>
        <h1>Mpox no Brasil: notificações</h1>
        <p className="suave">Como as notificações de mpox evoluíram entre 2022 e 2026, onde se concentram (com destaque para o PR) e a idade difere entre homens e mulheres? · {msg}</p>

        <div className="indicadores">
          {[[ind.n.toLocaleString("pt-BR"), "notificações"], [ind.media, "idade média (anos)"], [ind.mediana, "idade mediana"],
            [ind.hosp, "internados por necessidade clínica (entre os informados)"]].map(([v, t]) =>
            <div className="ind" key={t}><b>{v}</b><span>{t}</span></div>)}
        </div>

        <div className="graficos">
          <div className="caixa"><h3>Notificações por mês</h3><Grafico tipo="line" labels={mes.labels} valores={mes.valores} cor="#0f6b5c" /></div>
          <div className="caixa"><h3>Top 10 UFs de notificação</h3><Grafico tipo="bar" labels={ufs.labels} valores={ufs.valores} cor="#b8620b" /></div>
        </div>

        <div className="caixa"><h3>Idade por sexo</h3><div className="rolagem"><table>
          <thead><tr><th>Sexo</th><th>n</th><th>Média</th><th>Mediana</th><th>Desvio padrão</th></tr></thead>
          <tbody>{sexo.linhas.map(([s, v]) => <tr key={s}><td>{rotulo(CODIGOS.sexo, s)}</td><td>{v.length}</td>
            <td>{media(v).toFixed(1)}</td><td>{mediana(v)}</td><td>{desvio(v).toFixed(1)}</td></tr>)}</tbody></table></div>
          <p>{sexo.teste}</p></div>

        <div className="caixa"><h3>Classificação final × resultado laboratorial</h3><div className="rolagem"><table>
          <thead><tr><th>Classificação</th>{cruz.labs.map(l => <th key={l}>lab {l || "vazio"}</th>)}</tr></thead>
          <tbody>{Object.keys(cruz.c).sort().map(c => <tr key={c}><td>{rotulo(CODIGOS.classi, c)}</td>
            {cruz.labs.map(l => <td key={l}>{cruz.c[c][l] || 0}</td>)}</tr>)}</tbody></table></div></div>

        <div className="caixa"><h3>Resumo por ano (respeita UF e sexo)</h3><div className="rolagem"><table>
          <thead><tr><th>Ano</th><th>Notificações</th><th>Confirmadas</th><th>% confirmadas</th><th>% descartadas</th><th>% internados (confirmadas)</th></tr></thead>
          <tbody>{anos.map(r => <tr key={r.a}><td>{r.a}</td><td>{r.n}</td><td>{r.conf}</td><td>{r.pc}%</td><td>{r.pd}%</td><td>{r.ph}</td></tr>)}</tbody></table></div></div>

        <div className="caixa"><h3>Primeiros registros do filtro</h3><div className="rolagem"><table>
          <thead><tr><th>Data</th><th>UF</th><th>Sexo</th><th>Idade</th><th>Classificação</th></tr></thead>
          <tbody>{dados.slice(0, 15).map((d, i) => <tr key={i}><td>{d.data}</td><td>{d.uf}</td><td>{rotulo(CODIGOS.sexo, d.sexo)}</td>
            <td>{isNaN(d.idade) ? "" : d.idade}</td><td>{rotulo(CODIGOS.classi, d.classi)}</td></tr>)}</tbody></table></div></div>

        <Conclusao />
      </main>
    </div>
  );
}