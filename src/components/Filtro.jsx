export default function Filtro({ titulo, valor, onChange, lista, nome }) {
  return (
    <label>{titulo}
      <select value={valor} onChange={e => onChange(e.target.value)}>
        <option value="">Todos</option>
        {lista.map(v => <option key={v} value={v}>{nome ? nome(v) : (v || "vazio")}</option>)}
      </select>
    </label>
  );
}