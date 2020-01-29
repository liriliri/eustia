import async from 'async'
import fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'
import logger from './logger'
import util from './util'

const tpl: any = {}
const template: any = {
  amd: util.stripIndent`
    define([], function () {
      {{codes}}
    });
  `,
  code: util.stripIndent`
    /* ------------------------------ {{name}} ------------------------------ */

    {{#if hasExports}}
    {{#if es}}export {{/if}}var {{name}} = _.{{name}} = (function (exports) {
        {{code}}
    
        return exports;
    })({});
    {{else}}
    (function () {
        {{code}}
    })();
    {{/if}}
  `,
  codes: util.stripIndent`
    /* eslint-disable */
    {{#if strict}}"use strict";{{/if}}
    
    var _ = {};
    
    {{#if inBrowser}}
    if (typeof window === 'object' && window.{{namespace}}) _ = window.{{namespace}};
    
    {{#if excludeRef}}
    {{#each excludeRef}}{{#if @first}}var {{else}}    {{/if}}{{.}} = _.{{.}}{{#if @last}};{{else}},{{/if}}
    {{/each}}
    {{/if}}
    {{/if}}
    
    {{code}}
    
    {{#if commonjs}}module.exports = _;{{else if es}}export default _;{{else}}return _;{{/if}}
  `,
  global: util.stripIndent`
    window.{{namespace}} = (function()
    {
    {{codes}}
    })();
  `,
  umd: util.stripIndent`
    (function(root, factory)
    {
        if (typeof define === 'function' && define.amd)
        {
            define([], factory);
        } else if (typeof module === 'object' && module.exports)
        {
            module.exports = factory();
        } else { root.{{namespace}} = factory(); }
    }(this, function ()
    {
    {{codes}}
    }));
  `
}

function readTpl(tplName: string) {
  return function(cb: Function) {
    if (template[tplName]) {
      tpl[tplName] = handlebars.compile(template[tplName], { noEscape: true })
      cb()
    } else {
      const tplPath = path.resolve(__dirname, '../../tpl/' + tplName + '.hbs')
      logger.debug('Read tpl', tplPath)
      fs.readFile(tplPath, 'utf8', function(err, data) {
        if (err) {
          return cb(err)
        }

        tpl[tplName] = handlebars.compile(data, { noEscape: true })

        cb()
      })
    }
  }
}

export default function(templates: string[], cb: Function) {
  const callbacks = templates.map(function(val) {
    return readTpl(val)
  })

  async.parallel(callbacks, function(err) {
    if (err) {
      return cb(err)
    }

    cb(null, tpl)
  })
}
