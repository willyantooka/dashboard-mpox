export const API = "/api/vigilancia-e-meio-ambiente/mpox";
export const MAX_PAGINAS = 200;

export const CODIGOS = {
  sexo: { "1": "Masculino", "2": "Feminino", "3": "Intersexo", "9": "Ignorado" },
  classi: { "1": "Confirmado (laboratorialmente)", "2": "Descartado", "3": "Provável", "4": "Suspeito", "5": "Perda de seguimento", "6": "Exclusão" },
};

export const rotulo = (tab, c) => tab[c] ?? (c === "" ? "vazio" : "código " + c);
export const idadeOk = d => !isNaN(d.idade) && d.idade >= 0 && d.idade <= 120;

export function limpar(d) {
  const data = d.dt_notific || "";
  return { uf: d.sg_uf_not || "", sexo: d.cs_sexo ?? "", idade: Number(d.nu_idade_n), data,
           ano: data.slice(0, 4), mes: data.slice(0, 7), classi: d.classi_fin ?? "",
           hosp: d.hospital ?? "", lab: d.resultado_exa_lab ?? "" };
}

export function contar(arr, chave) {
  const c = {};
  arr.forEach(d => { c[d[chave]] = (c[d[chave]] || 0) + 1; });
  return c;
}