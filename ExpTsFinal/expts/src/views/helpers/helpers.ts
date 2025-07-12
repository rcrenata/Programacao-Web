import { Technology } from './helpersTypes';

export function listNodeTechs(technologies: Technology[]): string {
    if (!technologies) return '';
    const nodeTechs = technologies.filter(tech => tech.poweredByNodejs);
    const listItems = nodeTechs.map(tech => `<li>${tech.name} - ${tech.type}</li>`);
    return `<ul>${listItems.join('')}</ul>`;
}