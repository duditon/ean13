let opt = document.querySelector("#ipt1")
let id = document.querySelector("#ipt2")
let v = document.querySelector("#ipt3")
let btn = document.querySelector("#ipt4")
let res = document.querySelector(".container-result")

//Gerador codigo de barras EAN-13
function gerarEAN(padrao, idProduto, variacoes) {
    if(padrao == "null") {
        opt.style.boxShadow = "0px 0px 0px 3px red"
        return
    }else {
        opt.style.boxShadow = "unset"
    }

    if(variacoes == "0") {
        v.style.boxShadow = "0px 0px 0px 3px red"
        return
    }else {
        v.style.boxShadow = "unset"
    }

    res.innerHTML = ""
    let idBasico = idProduto
    let result = []
    for (let i = 0; i < variacoes; i++) {
        let pesosSoma = 0
        let index = ""

        if(i < 10) index = i.toString().replace(/(\w{1})/,"0$1")
        else if(i < 100) index = i.toString().replace(/(\w{2})/,"$1")
        else if(i >= 100) index = "999"

        if (parseInt(idProduto).toString().length == 1) {
            idBasico = parseInt(idProduto).toString().replace(/(\d{1})/,"000$1") + index
        }else if (parseInt(idProduto).toString().length == 2) {
            idBasico = parseInt(idProduto).toString().replace(/(\d{2})/,"00$1") + index
        }else if (parseInt(idProduto).toString().length == 3) {
            idBasico = parseInt(idProduto).toString().replace(/(\d{3})/,"0$1") + index
        }else if (parseInt(idProduto).toString().length == 4) {
            idBasico = parseInt(idProduto).toString().replace(/(\d{4})/,"$1") + index
        }else {
            idBasico = parseInt(idProduto).toString().replace(/(\d{3})\d+?$/,"$1") + index
        }

        let idTotal = padrao + idBasico

        let pesos = []

        for (let y = idTotal.length - 1; y >= 0; y--) {
            let mult = y % 2 == 0 ? idTotal[y] * 1 : idTotal[y] * 3
            pesos.push(mult)
            pesosSoma += mult
        }

        let pesosDividir = parseInt(pesosSoma / 10) + 1

        let sub = (pesosDividir * 10) - pesosSoma
        let dv = sub % 10 == 0 ? 0 : sub

        result.push(padrao + idBasico + dv)
    }
    result.forEach((e,index) => {
        const txt = document.createElement("p")
        txt.setAttribute("title", "Clique para copiar")
        txt.setAttribute("class", "txt-result")
        txt.addEventListener("click", () => {
            const c = document.createElement("textarea")
            c.setAttribute("class", "txt-copy")
            c.value = e
            document.body.append(c)
            c.select()
            document.execCommand("copy")
            c.remove()
            txt.style.color = "green"
            txt.style.fontWeight = "bold"
        })
        txt.innerHTML = (index + 1) + ": " + e
        res.append(txt)
    })
}


window.addEventListener("DOMContentLoaded", () => {
    id.value = "0000"
    v.value = "30"

    const item1 = "789001" //Botas e Botinas
    const item2 = "789002" //Chapéu
    const item3 = "789003" //Bolsas
    const item4 = "789004" //Acessórios
    const item5 = "789005" //Vestuário
    const item6 = "789006" //Cintos e Carteiras

    btn.addEventListener("click", () => gerarEAN(opt.value, id.value, v.value))

    id.addEventListener("input", (e) => {
        e.preventDefault()
        if (parseInt(e.target.value) < 10) {
            e.target.value = parseInt(e.target.value).toString().replace(/(\d{1})/, "000$1")
        } else if (parseInt(e.target.value) < 100) {
            e.target.value = parseInt(e.target.value).toString().replace(/(\d{2})/, "00$1")
        } else if (parseInt(e.target.value) < 1000) {
            e.target.value = parseInt(e.target.value).toString().replace(/(\d{3})/, "0$1")
        } else if (parseInt(e.target.value) < 10000) {
            e.target.value = parseInt(e.target.value).toString().replace(/(\d{4})/, "$1")
        } else {
            e.target.value = parseInt(e.target.value).toString().replace(/(\d{4})\d+?$/, "$1")
        }
        e.target.setAttribute("value", parseInt(e.target.value))
    })

    v.addEventListener("input", (e)=>{
        e.preventDefault()
        if(e.target.value > 100) e.target.value = 100
    })
})