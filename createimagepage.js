$(document).ready(function(){
    var $FNameLNameRegEx = /^([a-zA-Z]{2,20})$/;
    var $PasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;
    var $ConNoRegEx = /^([0-9]{10})$/;

    var TxtFNameFlag = false, TxtLNameFlag = false, TxtEmailIdFlag = false, TxtContactNoFlag = false, TxtPasswordFlag = false;
    var FileFlag = false; FileExtFlag = false; FileSizeFlag = false;
    $("#FU_ProductImage").change(function(){
        $("#ProductImageValidate").empty();
        var Filesize = document.getElementById("FU_ProductImage").files[0].size / 1024 / 1024;
        if(document.getElementById("FU_ProductImage").files.length == 0)
        {
            $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB & Lower Than 100 MB..!!");
            FileFlag = false;
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
        
        }
        else
        {
            FileFlag = true;
           var extension = document.getElementById("FU_ProductImage").value.split('.').pop().toLowerCase();
            var fileextension = ['jpeg','jpg','png','bmp'];

            if($.inArray(extension,fileextension) == -1)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileExtFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else
            {
                FileExtFlag = true;
            }

            if(Filesize > 100)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileSizeFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            
            }
            else
            {
                FileSizeFlag = true;
            }

        }
        if (FileFlag == true && FileSizeFlag == true && FileExtFlag == true) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("ImgProductDisplayPic").src = e.target.result;
            };
            reader.readAsDataURL(document.getElementById("FU_ProductImage").files[0]);
        }
        else {
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            $("#FU_ProductImage").replaceWith($("#FU_ProductImage")).val("").clone(true);
        }
    });
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace.
    specialKeys.push(9); //Tab.
    specialKeys.push(46); //Delete.
    specialKeys.push(16); //Shift.
    specialKeys.push(20); //Caps Lock.
    specialKeys.push(37); //Right Arrow.
    specialKeys.push(39); //Left Arrow.

    $("#FNAME").bind("keypress",function(e){

        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode>=65 && keyCode<=90 ) || (keyCode>=97 && keyCode<=122) || (specialKeys.indexOf(keyCode) != -1));
        $("#FNAMEVALIDATE").html(ret ? " " : "(*)fname is invalid...");
        return ret;
    });

    $("#LNAME").bind("keypress",function(e){

        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode>=65 && keyCode<=90 ) || (keyCode>=97 && keyCode<=122) || (specialKeys.indexOf(keyCode) != -1));
        $("#LNAMEVALIDATE").html(ret ? " " : "(*)lname is invalid...");
        return ret;
    });
    
    $("#CONTACTNO").bind("keypress",function(e){

        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode>=48 && keyCode<=57 ) || (specialKeys.indexOf(keyCode) != -1));
        $("#CONTACTNOVALIDATE").html(ret ? " " : "(*)lname is invalid...");
        return ret;
    });

    $("#FNAME").bind("blur",function(){
        $("#FNAMEVALIDATE").empty();
        if($("#FNAME").val()=="")
        {
            $("#FNAMEVALIDATE").html("(*)fname is required....");
        }
        else
        {
            if($("#FNAME").val().match($FNameLNameRegEx))
            {
                TxtFNameFlag = true;
            }
            else
            {
                $("#FNAMEVALIDATE").html("(*)fname is invalid....");
            }
        }
    });

    $("#LNAME").bind("blur",function(){
        $("#LNAMEVALIDATE").empty();
        if($("#LNAME").val()=="")
        {
            $("#LNAMEVALIDATE").html("(*)lname is required....");
        }
        else
        {
            if($("#LNAME").val().match($FNameLNameRegEx))
            {
                TxtLNameFlag = true;
            }
            else
            {
                $("#LNAMEVALIDATE").html("(*)lname is invalid....");
            }
        }
    });

    $("#CONTACTNO").bind("blur",function(){
        $("#CONTACTNOVALIDATE").empty();
        if($("#CONTACTNO").val()=="")
        {
            $("#CONTACTNOVALIDATE").html("(*)contactno is required....");
        }
        else
        {
            if($("#CONTACTNO").val().match($ConNoRegEx))
            {
                TxtContactNoFlag = true;
            }
            else
            {
                $("#CONTACTNOVALIDATE").html("(*)contact is invalid....");
            }
        }
    });

    $("#EMAILID").bind("blur",function(){
        $("#EMAILIDVALIDATE").empty();
        if($("#EMAILID").val()=="")
        {
            $("#EMAILIDVALIDATE").html("(*)emailid is required....");
        }
        else
        {
            if($("#EMAILID").val().match($EmailIdRegEx))
            {
                TxtEmailIdFlag = true;
            }
            else
            {
                $("#EMAILIDVALIDATE").html("(*)emailid is invalid....");
            }
        }
    });

    $("#PASSWORD").bind("blur",function(){
        $("#PASSWORDVALIDATE").empty();
        if($("#PASSWORD").val()=="")
        {
            $("#PASSWORDVALIDATE").html("(*)password is required....");
        }
        else
        {
            if($("#PASSWORD").val().match($PasswordRegEx))
            {
                TxtPasswordFlag = true;
            }
            else
            {
                $("#PASSWORDVALIDATE").html("(*)password is invalid....");
            }
        }
    });

    $("#btn").click(function(){
       
        $("#ProductImageValidate").empty();
        var Filesize = document.getElementById("FU_ProductImage").files[0].size / 1024 / 1024;
        if(document.getElementById("FU_ProductImage").files.length == 0)
        {
            $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB & Lower Than 100 MB..!!");
            FileFlag = false;
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
        
        }
        else
        {
            FileFlag = true;
           var extension = document.getElementById("FU_ProductImage").value.split('.').pop().toLowerCase();
            var fileextension = ['jpeg','jpg','png','bmp'];

            if($.inArray(extension,fileextension) == -1)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileExtFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else
            {
                FileExtFlag = true;
            }

            if(Filesize > 100)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileSizeFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            
            }
            else
            {
                FileSizeFlag = true;
            }

        }
            $("#FNAMEVALIDATE").empty();
            if($("#FNAME").val()=="")
            {
                $("#FNAMEVALIDATE").html("(*)fname is required....");
            }
            else
            {
                if($("#FNAME").val().match($FNameLNameRegEx))
                {
                    TxtFNameFlag = true;
                }
                else
                {
                    $("#FNAMEVALIDATE").html("(*)fname is invalid....");
                }
            }
        
    
        
            $("#LNAMEVALIDATE").empty();
            if($("#LNAME").val()=="")
            {
                $("#LNAMEVALIDATE").html("(*)lname is required....");
            }
            else
            {
                if($("#LNAME").val().match($FNameLNameRegEx))
                {
                    TxtLNameFlag = true;
                }
                else
                {
                    $("#LNAMEVALIDATE").html("(*)lname is invalid....");
                }
            }
        
    
        
            $("#CONTACTNOVALIDATE").empty();
            if($("#CONTACTNO").val()=="")
            {
                $("#CONTACTNOVALIDATE").html("(*)contactno is required....");
            }
            else
            {
                if($("#CONTACTNO").val().match($ConNoRegEx))
                {
                    TxtContactNoFlag = true;
                }
                else
                {
                    $("#CONTACTNOVALIDATE").html("(*)contact is invalid....");
                }
            }
        
    
       
            $("#EMAILIDVALIDATE").empty();
            if($("#EMAILID").val()=="")
            {
                $("#EMAILIDVALIDATE").html("(*)emailid is required....");
            }
            else
            {
                if($("#EMAILID").val().match($EmailIdRegEx))
                {
                    TxtEmailIdFlag = true;
                }
                else
                {
                    $("#EMAILIDVALIDATE").html("(*)emailid is invalid....");
                }
            }
        
    
        
            $("#PASSWORDVALIDATE").empty();
            if($("#PASSWORD").val()=="")
            {
                $("#PASSWORDVALIDATE").html("(*)password is required....");
            }
            else
            {
                if($("#PASSWORD").val().match($PasswordRegEx))
                {
                    TxtPasswordFlag = true;
                }
                else
                {
                    $("#PASSWORDVALIDATE").html("(*)password is invalid....");
                }
            }
        

            if(TxtFNameFlag == true && TxtLNameFlag == true && TxtEmailIdFlag == true &&  TxtContactNoFlag == true && TxtPasswordFlag == true && FileFlag == true    && FileSizeFlag==true   && FileExtFlag == true)
            {
                var  IMGDATA=null;
        
                var filetoupload = document.getElementById("FU_ProductImage").files;
            var FD = new FormData();
                
            FD.append("filetoupload",filetoupload[0]);
            var contenttype ={
                header:{"content-type":"multipart/form-data"}
            }
            axios.post('/FileUpload',FD,contenttype)
            .then(function(response){
                IMGDATA = response.data;
                CreateNewAccount(IMGDATA,$("#FNAME").val().trim(),$("#LNAME").val().trim(),$("#CONTACTNO").val().trim(),$("#EMAILID").val().trim(),$("#PASSWORD").val().trim());

                console.log(response.data);

            })
            .catch(function(error){
                console.log(error);
            });
                
                
            }
            else
            {
                alert("invalid input check again...");
            }
    });
   
});

function CreateNewAccount(IMGDATA,FNAME,LNAME,CONTACTNO,EMAILID,PASSWORD)
{
    
    $.ajax({

        url:"/createimagepage",
        type:"post",
        data:{IMGDATA:IMGDATA,FNAME:FNAME,LNAME:LNAME,CONTACTNO:CONTACTNO,EMAILID:EMAILID,PASSWORD:PASSWORD},
        cache:false,
        success:function(data){
            
            alert(data);
            clearedata();

        },
        failur:function(){
            alert("sorry...");
        }
    });
}

function clearedata()
{
    document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
    $("#FU_ProductImage").replaceWith($("#FU_ProductImage")).val("").clone(true);
        
    $("#FNAME").val("");
    $("#LNAME").val("");
    $("#CONTACTNO").val("");
    $("#EMAILID").val("");
    $("#PASSWORD").val("");
}