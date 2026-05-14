"use strict";

var SwiftREHighlight = {
    keywords: /\b(RULE|WHEN|THEN|AND|OR|NOT|IS|SET|TO|ERROR|WARNING|INFO|ON|PRIORITY|SIGNAL|AN|EVENT|OF|TYPE|WITH|A|PAYLOAD|CONTAINS|STARTS|ENDS|MATCHES|GREATER|LESS|THAN|AT|LEAST|MOST|EQUAL|BEFORE|AFTER|BETWEEN|IGNORING|CASE|DAYS|MONTHS|YEARS|AGO|FROM|NOW|TODAY|YESTERDAY|TOMORROW|DATE|IN)\b/g,

    highlight: function (el) {
        var text = el.textContent;
        var html = "";
        var i = 0;

        while (i < text.length) {
            if (text[i] === '"') {
                var end = text.indexOf('"', i + 1);
                if (end === -1) end = text.length - 1;
                html += '<span class="hl-string">' + this._esc(text.substring(i, end + 1)) + '</span>';
                i = end + 1;
            } else if (text[i] === '`') {
                var end = text.indexOf('`', i + 1);
                if (end === -1) end = text.length - 1;
                html += '<span class="hl-field">' + this._esc(text.substring(i, end + 1)) + '</span>';
                i = end + 1;
            } else {
                var rest = text.substring(i);
                var wordMatch = rest.match(/^[A-Za-z_][A-Za-z0-9_.]*/);
                if (wordMatch) {
                    var word = wordMatch[0];
                    if (this.keywords.test(word)) {
                        this.keywords.lastIndex = 0;
                        html += '<span class="hl-keyword">' + this._esc(word) + '</span>';
                    } else {
                        html += this._esc(word);
                    }
                    i += word.length;
                } else {
                    var numMatch = rest.match(/^\d+(\.\d+)?/);
                    if (numMatch) {
                        html += '<span class="hl-number">' + this._esc(numMatch[0]) + '</span>';
                        i += numMatch[0].length;
                    } else {
                        html += this._esc(text[i]);
                        i++;
                    }
                }
            }
        }

        el.innerHTML = html;
    },

    highlightAll: function () {
        var blocks = document.querySelectorAll("pre code.language-swiftre");
        for (var i = 0; i < blocks.length; i++) {
            this.highlight(blocks[i]);
        }
    },

    _esc: function (s) {
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
};

document.addEventListener("DOMContentLoaded", function () {
    SwiftREHighlight.highlightAll();
});
