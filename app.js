const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { exec } = require('child_process');
// let proceso = ["Add-AppxPackage", "Add-AppxProvisionedPackage", "Get-process"];

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/public'))

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/darproceso', (req,res) => {
    let nombre = req.body.comando
    if (nombre) {
    exec(`${nombre} | ConvertTo-Html`, {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
      {res.send(stdout);}
      console.log(stdout)
    // if(console.log(stdout) = "\r"){
        // let pagina2 = '<!doctype html><html><head></head><body>'
        // pagina2 += `<h1>ERROR</h1><p> El comando es erróneo</p></body></html>`
        // res.send(pagina2)
      // }
    })}
    else{
      let pagina = '<!doctype html><html><head></head><body>'
      pagina += `<h1>ERROR</h1><p> No has escrito ningún comando</p></body></html>`
      res.send(pagina)
    }})

var server = app.listen(8888, () => {
  console.log('Servidor web iniciado')
});

