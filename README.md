# string loader for webpack

webpack loader: resource file transform to string

## Installation

`npm install string2-loader --save-dev`

## Usage

### webpack.config setting
``` javascript
loaders: [ { test: /\.[name]$/, loader: "string2" } ]
```

## Example 1: html transform to string template

 webpack.config
``` javascript
loaders: [ { test: /\.html$/, loader: "string2" } ]
```

list.tpl.html
``` javascript
<ul>
    <% for(var i in list){ %>
        <li><%= list[i].text %></li>
    <% } %>
</ul>
```
list.js
``` javascript
var Template = require('template'),
    TPL = require('./list.tpl.html');

var html = Template(TPL, [
    {
        text: 'option1'
    },
    {
        text: 'option2'
    }
]);

console.log(html);  //html: '<ul><li>option1</li><li>option2</li></ul>'
```

### Example 2: josn transform to string template

webpack.config
``` javascript
loaders: [ { test: /\.html|\.json$/, loader: "string2" } ]
```

data.json
``` javascript
[
  {
    "text": "first",
    "value": "first"
  },
  {
    "text": "second",
    "value": "second"
  }
]
```

index.js
``` javascript
var str = require('./data');

var json = JSON.parse(str);

console.log(json);  //json: [{"text": "first","value": "first"},{"text": "second","value": "second"}]
```




### Example 3: multiple string template


webpack.config
``` javascript
loaders: [ { test: /\.html$/, loader: "string2" } ]
```

template.html
``` html
<string2-template id="template_approot">
    <div class="app-root">
        <app-header />
        <router-view/>
    </div>
</string2-template>
<string2-template id="template_header">

    <div class="app-header">
        header
    </div>

</string2-template>
```

index.js
``` javascript
import {template_approot,template_header} from './template.html';

console.log(template_approot);
//<div class="app-root"> <app-header /> <router-view/> </div>
console.log(template_header);
//<div class="app-header"> header </div>
```