import { media, mediana, desvio } from "./estatistica";
import { contar, idadeOk, rotulo, CODIGOS } from "./dados";

const pct = (a, b) => (100 * a / b).toFixed(1);
const infos = x => x.filter(d => d.hosp !== "" && d.hosp !== "9");

export function indicadores(dados) {
  const idades = dados.filter(idadeOk).map(d => d.idade);
  const inf = infos(dados);
  return { n: dados.length,
    media: idades.length ? media(idades).toFixed(1) : "–",
    mediana: idades.length ? mediana(idades) : "–",
    hosp: inf.length ? pct(inf.filter(d => d.hosp === "1").length, inf.length) + "%" : "–" };
}

export function porMes(dados) {
  const c = contar(dados.filter(d => d.mes), "mes"), labels = Object.keys(c).sort();
  return { labels, valores: labels.map(m => c[m]) };
}

export function topUfs(dados) {
  const e = Object.entries(contar(dados, "uf")).sort((a, b) => b[1] - a[1]).slice(0, 10);
  return { labels: e.map(x => x[0] || "vazio"), valores: e.map(x => x[1]) };
}

export function statsSexo(dados) {
  const g = {};
  dados.filter(idadeOk).forEach(d => (g[d.sexo] ??= []).push(d.idade));
  const linhas = Object.entries(g).filter(([, v]) => v.length > 1).sort((a, b) => b[1].length - a[1].length);
  let teste = "Selecione um filtro que mantenha pelo menos dois grupos de sexo.";
  if (linhas.length >= 2) {
    const [[sa, a], [sb, b]] = linhas;
    const t = (media(a) - media(b)) / Math.sqrt(desvio(a) ** 2 / a.length + desvio(b) ** 2 / b.length);
    teste = `Diferença de médias (${rotulo(CODIGOS.sexo, sa)} − ${rotulo(CODIGOS.sexo, sb)}): ${(media(a) - media(b)).toFixed(1)} anos; t de Welch = ${t.toFixed(2)} (se o t, sem sinal, passar de 1,96, a diferença vai além do acaso, a ~95%).`;
  }
  return { linhas, teste };
}

export function cruzamento(dados) {
  const c = {};
  dados.forEach(d => { (c[d.classi] ??= {})[d.lab] = (c[d.classi][d.lab] || 0) + 1; });
  return { c, labs: [...new Set(dados.map(d => d.lab))].sort() };
}

export function resumoAnos(todos, uf, sexo) {
  const base = todos.filter(d => (!uf || d.uf === uf) && (!sexo || d.sexo === sexo));
  return [...new Set(base.map(d => d.ano))].filter(Boolean).sort().map(a => {
    const x = base.filter(d => d.ano === a), conf = x.filter(d => d.classi === "1"), inf = infos(conf);
    return { a, n: x.length, conf: conf.length, pc: pct(conf.length, x.length),
             pd: pct(x.filter(d => d.classi === "2").length, x.length),
             ph: inf.length ? pct(inf.filter(d => d.hosp === "1").length, inf.length) + "%" : "–" };
  });
}