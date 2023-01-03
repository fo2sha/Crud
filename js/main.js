// منعرفيم هنا عشان يبقو جلوبل استخدمهم تانى 
// بدون .value عشان البراوزر مجرد ما ادخل ميخزنش قيم فاضية لا انا عاوز مجرد ما ادوس يخزم عشان كده اخدت منها القيمة فى الفانكشن نفسها
var productNameInput =document.getElementById("productNameInput");
var productPriceInput =document.getElementById("productPriceInput");
var productCategoryInput =document.getElementById("productCategoryInput");
var productDescriptionInput =document.getElementById("productDescriptionInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");

var productContainer  ;
var mainIndex = 0;

if (localStorage.getItem('myProducts') != null){
    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productContainer);
}
else{
    productContainer =[];
}



// الفانكشن اللى لما ادوس ع الزرار بتشتغل
function addProduct(){
    //envoke validation function
    if (validateInputName() == true){
        // if condition for update value
        if(btnUpdate.classList.contains('d-none') == true){
            // هنا بعرف الاوبجكت اللى هيشيل كل الداتا اللى هسحبها من ال input
            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                category:productCategoryInput.value,
                desc:productDescriptionInput.value,
            }
                // ده عشان اعمل اراى اضيف فيها كل اوبجكت من المنتجات اللى بجيبها
            productContainer.push(product);
                
        }
        else if (btnAdd.classList.contains('d-none') == true) {
            btnUpdate.classList.add('d-none');
            btnAdd.classList.remove('d-none');
            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                category:productCategoryInput.value,
                desc:productDescriptionInput.value,
            }
            productContainer.splice(mainIndex,1,product);
        }
        

        //json ده شكل الاراى اللى واها مجموعة اوبجكتس
        // strigify بحول الاراى ديه لاسترنج عشان مش بتقبل غيره
        localStorage.setItem('myProducts',JSON.stringify(productContainer));
        clearFrom();
        displayProducts(productContainer);  
    }
    else{
        alert("invalid Name");
    }
    
}
// فانكشن بتمسح كل اللى ف الانبوت كل مرة بيضيف فيها داتا وبعملها كول ف فانكشن ضغط الزر
function clearFrom(){
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescriptionInput.value=""
}

// ديه فانكشن لعرض الداتا داخل الجدول بتاعى
// عامل الكرتونه فاضية بعد كده ببدء اجيب صف صف ف الاراى اللى عاملها اللى فيها الاوبجكتس واخد منها كل كى فيها واضفها ف الكرتونة
// بعد كده اضيف الكرتونه كلها ف الجدول
// عملتلها براميتر اللى بدخله وعملتله كول فوق ب اسم الارى اللى فيها الاوبجكتس ليه عشان اقدر استخدمها تانى مع اراى او غانكشن تانية مختلفة عاوز اعرضها زى مثلا السيرش هعرض حاجات معينة كده
function displayProducts(productList){
    cartona=``;
    for(var i=0 ; i < productList.length ; i++){
        cartona += `<tr>
        <td>${i+1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button onclick="setFormForUpdate(${i});" class="btn btn-sm btn-outline-warning">update</td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-sm btn-outline-danger">delete</td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML= cartona;
}

function searchProducts(searchTerm){

    var searchResult =[];
    for(var i =0 ; i<productContainer.length ;i++){
        if (productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true){
           searchResult.push(productContainer[i]);
        }
    }
    displayProducts(searchResult);
}
function deleteProduct(deletedIndex){
    productContainer.splice(deletedIndex,1);
    localStorage.setItem('myProducts',JSON.stringify(productContainer));
    displayProducts(productContainer);
}
// 
function setFormForUpdate(updateIndex){
    productNameInput.value = productContainer[updateIndex].name ;
    productPriceInput.value = productContainer[updateIndex].price ;
    productCategoryInput.value = productContainer[updateIndex].category ;
    productDescriptionInput.value = productContainer[updateIndex].desc ;
    btnUpdate.classList.replace('d-none' , 'd-inline-block');
    btnAdd.classList.add('d-none');
    mainIndex = updateIndex
    
}

//validation name function 
function validateInputName(){
    var regex = /^[A-Z][a-z]{3,8}$/ ;
    if (regex.test(productNameInput.value) == true){
        productNameInput.classList.replace('is-invalid' , 'is-valid');
        return true ;
    }
    else{
        productNameInput.classList.add('is-invalid');
        return false;
    }
}