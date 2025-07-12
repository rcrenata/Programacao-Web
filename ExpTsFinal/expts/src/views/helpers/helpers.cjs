module.exports = {
    listNodejsTechnologies: function (technologies) {
        if (!technologies || !Array.isArray(technologies)) {
            return '';
        }
        const nodeTechs = technologies.filter(tech => tech.poweredByNodejs);
        const listItems = nodeTechs.map(tech => `<li>${tech.name} - ${tech.type}</li>`);
        return `<ul>${listItems.join('')}</ul>`;
    },

    eq: function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    
    inc: function (value) {
        return parseInt(value, 10) + 1;
    }
};