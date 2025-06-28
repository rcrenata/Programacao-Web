function listNodeTechs(technologies) {
  if (!technologies || !Array.isArray(technologies)) {
    return '';
  }

  const nodeTechs = technologies.filter(tech => tech.poweredByNodejs);
  const listItems = nodeTechs.map(tech => `<li>${tech.name} - ${tech.type}</li>`);
  return `<ul>${listItems.join('')}</ul>`;
}

module.exports = { listNodeTechs };