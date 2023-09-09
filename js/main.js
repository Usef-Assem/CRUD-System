var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var currentIndex = 0;
$(".h1-cstm").show(3000)
var productList = [];
if(localStorage.getItem('products') != null){
    productList = JSON.parse(localStorage.getItem('products'))
    displayProduct(productList)
}
function addProduct(){
    var product = {
        name :    productNameInput.value ,
        Price :   productPriceInput.value ,
        Category: productCategoryInput.value ,
        Desc :    productDescInput.value ,
    }
    console.log(product);
    productList.push(product);
    localStorage.setItem('products' , JSON.stringify(productList))
    console.log(productList);
    displayProduct(productList)
    
};

function displayProduct(){
   var temp = '' ;
   for(var i =0 ; i < productList.length ; i++){
    temp += `  <tr>
    <td> `+ i +` </td>
    <td> `+productList[i].name+` </td>
    <td> `+productList[i].Price+` </td>
    <td> `+productList[i].Category+`</td>
    <td> `+productList[i].Desc+`</td>
    <td><button onclick= "update(` + i + `)" class="btn btn-warning btn-sm">Update</button></td>
    <td><button onclick="deleteProduct(` + i + `)" class="btn btn-danger btn-sm">Delete</button></td>
</tr> `
   } 
   document.getElementById("tableBody").innerHTML = temp;
}
function clearForm(){
    productNameInput.value = "" ;
    productPriceInput.value = "" ; 
    productCategoryInput.value = "" ;
    productDescInput.value = "" ;
}

function deleteProduct(index){
    productList.splice(index , 1);
    localStorage.setItem('products' , JSON.stringify(productList))
    displayProduct()
}
function update(index){
    currentIndex = index ;
    productNameInput.value = productList[index].name
    productPriceInput.value = productList[index].Price
    productCategoryInput.value = productList[index].Category    
    productDescInput.value = productList[index].Desc
    document.getElementById("addPro").style.display = "none"
    document.getElementById("editproduct").style.display = "inline-block"
    displayProduct()
}
function edit(){
    productList[currentIndex].name = productNameInput.value ;
    productList[currentIndex].Price = productPriceInput.value ; 
    productList[currentIndex].Category =  productCategoryInput.value ;
    productList[currentIndex].Desc =  productDescInput.value ;
    displayProduct()
    localStorage.setItem('products' , JSON.stringify(productList))
    document.getElementById("addPro").style.display = "inline-block"
    document.getElementById("editproduct").style.display = "none"
}
function search (){
    var searchVal = searchInput.value.toLowerCase()
    var temp = ""
    for( var i = 0 ; i < productList.length ; i++){
        var temp = ""
            var temp = '' ;
            for(var i =0 ; i < productList.length ; i++){
                if( productList[i].name.toLowerCase().includes(searchVal) == true 
                || productList[i].Category.toLowerCase().includes(searchVal) == true )
             temp += `  <tr>
             <td> `+ i +` </td>
             <td> `+productList[i].name.toLowerCase().replace(searchVal , "<span class = 'bg-danger'>"+searchVal+"</span>") +` </td>
             <td> `+productList[i].Price+` </td>
             <td> `+productList[i].Category.toLowerCase().replace(searchVal , "<span class = 'bg-danger'>"+searchVal+"</span>")+`</td>
             <td> `+productList[i].Desc+`</td>
             <td><button onclick= "update(` + i + `)" class="btn btn-warning btn-sm">Update</button></td>
             <td><button onclick="deleteProduct(` + i + `)" class="btn btn-danger btn-sm">Delete</button></td>
         </tr> `
            } 
            document.getElementById("tableBody").innerHTML = temp;
        }
    }
