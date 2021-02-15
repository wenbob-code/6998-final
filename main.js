function main(){

    var name = document.getElementById("name").value;
    var brand = document.getElementById("brand").value;
    var description = document.getElementById("description").value;
    var quantity = document.getElementById("quantity").value;

    console.log(name, brand, description, quantity);
}




$.ajax({
    url:"query.php",    //the page containing php script
    type: "post",    //request type,
    dataType: 'json',
    data: {registration: "success", name: "xyz", email: "abc@gmail.com"},
    success:function(result){
        console.log(result.abc);
    }
});


console.log("aha");
