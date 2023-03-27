async function saveToLocalStorage(event) {
    try {
        event.preventDefault();
        const SellingPrice = event.target.SellingPrice.value;
        const ProductName = event.target.ProductName.value;
        const category = event.target.category.value;

        const obj = {
            SellingPrice,
            ProductName,
            category
        }
        let response = await axios.post('https://crudcrud.com/api/904c4116635f4c24a10faf115813eca6/addItem/', obj)

        showDetails(response.data)
        //console.log(response)
    }

    catch (err) {
        document.body.innerHTML = document.body.innerHTML + "<h4>something went wrong</h4>";
        console.log(err)
    }
    //localStorage.setItem(obj.d,JSON.stringify(obj))
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        let response = await axios.get("https://crudcrud.com/api/904c4116635f4c24a10faf115813eca6/addItem/")

        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
            showDetails(response.data[i])
        }

    }
    catch (err) {
        console.log(err)
    }
})


function showDetails(obj) {
    const p = document.getElementById('category').value

    const c = document.createElement('li')
    const a = document.getElementById('Electronic')
    const b = document.getElementById('Food')
    const d = document.getElementById('SkinCare')
    c.textContent = obj.SellingPrice + '-' + obj.ProductName + '-' + obj.category
    if (obj.category === "Electronic") {
        a.appendChild(c);
    }
    if (obj.category === "Food") {
        b.appendChild(c);
    }
    if (obj.category === "SkinCare") {
        d.appendChild(c);
    }

    const DeleteItem = document.createElement('input')
    DeleteItem.type = 'button'
    DeleteItem.value = 'Delete'
    DeleteItem.onclick = async () => {
        try {
            let response = await axios.delete(`https://crudcrud.com/api/904c4116635f4c24a10faf115813eca6/addItem/${obj._id}`)
            if (p === "Electronic") {
                a.removeChild(c);
            }
            else if (p === "Food") {
                b.removeChild(c);
            }
            else if (p === "SkinCare") {
                d.removeChild(c);
            }
        }
        catch (err) {
            console.log(err)
        }


    }

    c.appendChild(DeleteItem);
    //    c.appendChild(editFunction);
    //     //p.appendChild(c);

}