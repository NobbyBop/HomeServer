async function log(msg) {
    let _resp = await fetch("/log/", {
        method: "POST",
        body: JSON.stringify({
            msg: msg
        })
    })
}

function getJinjaVariables() {
    let page =  Number.parseInt(document.getElementById("hidden_page").textContent)
    let max_page = Number.parseInt(document.getElementById("hidden_max_page").textContent)
    let typ =  document.getElementById("hidden_typ").textContent
    let year = Number.parseInt(document.getElementById("hidden_year").textContent)
    let month = Number.parseInt(document.getElementById("hidden_month").textContent)
    let day = Number.parseInt(document.getElementById("hidden_day").textContent)
    let zoom = Number.parseInt(document.getElementById("hidden_zoom").textContent)
    return {page, typ, year, month, day, max_page, zoom}
}

function pageLeft() {
    let vars = getJinjaVariables()
    if (vars.page > 1) {
        window.location.href = `/?page=${vars.page - 1}&typ=${vars.typ}&year=${vars.year}&month=${vars.month}&day=${vars.day}&zoom=${vars.zoom}`
    }
}

function pageRight() {
    let vars = getJinjaVariables()
    if (vars.page < vars.max_page){
        window.location.href = `/?page=${vars.page + 1}&typ=${vars.typ}&year=${vars.year}&month=${vars.month}&day=${vars.day}&zoom=${vars.zoom}`
    }
}

function filter() {
    let vars = getJinjaVariables()

    let typ = document.getElementById("type_input").value
    let year = Number.parseInt(document.getElementById("year_input").value)
    let month = Number.parseInt(document.getElementById("month_input").value)
    let day = Number.parseInt(document.getElementById("year_input").value)

    window.location.href = `/?page=0&typ=${typ}&year=${year}&month=${month}&day=${day}&zoom=${vars.zoom}`
}

function zoomIn() {
    let vars = getJinjaVariables()
    if (vars.zoom > 1) { 
        document.getElementById("image_container").style.gridTemplateColumns = "1fr ".repeat(vars.zoom - 1)
        document.getElementById("hidden_zoom").textContent = String(vars.zoom - 1) 
    }
}

function zoomOut() {
    let vars = getJinjaVariables()
    if (vars.zoom < 5) { 
        document.getElementById("image_container").style.gridTemplateColumns = "1fr ".repeat(vars.zoom + 1)
        document.getElementById("hidden_zoom").textContent = String(vars.zoom + 1) 
    }
}

function startUp() {
    let vars = getJinjaVariables()
    document.getElementById("image_container").style.gridTemplateColumns = "1fr ".repeat(vars.zoom) 
}
startUp()

async function upload() {
    document.getElementById("upload_button").setAttribute("disabled", "true")
    let files = document.getElementById("file_input").files
    if (files.length <= 0) {
        document.getElementById("upload_message").textContent = "Error: You must select file(s)."
    } else {
        document.getElementById("upload_message").textContent = "Collecting..."
        for(let file of files) {
            let data = new FormData()
            data.append("myfile", file)
            let _resp = await fetch("/uploadfile/", {
                method: "POST",
                body: data
            })
        }
        document.getElementById("upload_message").textContent = "Uploading..."
        let _resp = await fetch("/ingest/", {
            method: "POST"
        })
        document.getElementById("upload_message").textContent = "Successfully uploaded! Refresh the page to see them."
    }
    document.getElementById("file_input").value = null
    document.getElementById("upload_button").removeAttribute("disabled")
}

async function deleteThis(id) {
    let button = document.getElementById(id)
    button.setAttribute("disabled", "true")
    let _resp = await fetch("/delete/", {
        method: "POST",
        body: JSON.stringify({
            path: id
        })
    })
}

async function deleteEverything() {
    let _resp = await fetch("/drop/", {
        method: "POST"
    })
    window.location.reload()
}

function toggleCollapse(header_id, div_id){
    let state = document.getElementById(div_id).getAttribute("active")
    if(state == null){
        document.getElementById(header_id).textContent = document.getElementById(header_id).textContent.replace("+", "-")
        document.getElementById(div_id).setAttribute("active", "true")
    } else {
        document.getElementById(header_id).textContent = document.getElementById(header_id).textContent.replace("-", "+")
        document.getElementById(div_id).removeAttribute("active")
    }
    
}