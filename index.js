var fs = require('fs');
var Handlebars = require('handlebars');


function render(data){
    //console.log(__dirname);
    //console.log(__filename);
    var fileName=__dirname+'/exampleHtmlReport/report.handlebars';
    var partialFileName=__dirname+'/exampleHtmlReport/partials/recursiveFolder.handlebars';
    var source=fs.readFileSync(fileName,'utf8').toString();
    var partial=fs.readFileSync(partialFileName,'utf8').toString();

    var options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false 
        partials: {
            footer: '<footer>the end</footer>'
        },
        batch: [__dirname+'/exampleHtmlReport/partials/recursiveFolder.handlebars'],
        helpers: {
            environment: function () {
                return env.environment;
            },
            capitals: function (str) {
                return str.toUpperCase();
            },
            hasFailed: function (statusFailedCount) {
                if (statusFailedCount > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    };
    Handlebars.registerPartial('recursiveFolder',partial);
    var template = Handlebars.compile(source,options);
    var output = template(data);
    return output;
}


//var result = render('./exampleHtmlReport/report.handlebars', data);

//console.log(result);

module.exports=render;

