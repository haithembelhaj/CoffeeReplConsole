var cofeeConsole = $('div.console'),
    controller = cofeeConsole.console({
        promptLabel: 'CoffeeScript> ',
        commandValidate: function(line){
            if (line == "")
                return false;
            else
                return true;
            },
        commandHandle: function(line, callback){
            try{
                var compiledSource = CoffeeScript.compile(line, {bare:true});
                chrome.devtools.inspectedWindow.eval(compiledSource,function(result, isException) {
                    if(isException){
                        callback(" "+result);
                    }else{
                        callback(" "+result);
                    }
                });
                //callback(eval(compiledSource).toString());
            }catch(e){
                return e.message;
            }
        },
        cols: 40,
        completeHandle: function(prefix, callback){
            var objects = prefix.split('.'),
                len = objects.length,
                objectsString = "";

            if(len == 1){
                objectsString = "window";
            }else{
                prefix = objects.pop();
                objectsString = objects.join('.');
            }

            chrome.devtools.inspectedWindow.eval("Object.getOwnPropertyNames("+objectsString+").toString()",function(result, isException) {
                var list = result.split(',')
                .filter(function(elem){ return elem.lastIndexOf(prefix,0) === 0; })
                .map(function(elem){return elem.substring(prefix.length);});

                callback(list);

            });
        },
        autofocus:true,
        animateScroll:true,
        promptHistory:true
        });