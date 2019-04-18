<script type="text/javascript">
    
    $(document).ready(function(){
        update_contacts();
        //teste se existe algum contato, se não, mosrtar msg
        test_contacts();

        M.AutoInit();
        $("#submit-contact").click(function(){
            save_contact();
        });
        $("#atualizar").click(function(){
            update_contacts();
        });
       
        $("#phone").mask("(99) 99999-9999");
        
        $("#search").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#contatos li").filter(function() {
              $(this).toggle($(this).children().find(".name").text().toLowerCase().indexOf(value) > -1)
            });
          });
        $("#cadastrar").click(function(){
            $("#name").val("");
            $("#phone").val("");
            $("#operator").val("");
            $("#contactId").val("");
        });
        $(document).on("click",".contato",function(event){
            $("#name").val($(this).children().find(".name").text());
            $("#phone").val($(this).children().find(".phone").text());
            $("#operator").val($(this).children().find(".operator").text());
            $("#contactId").val($(this).children().find(".contactId").val());
        });
        $(document).on("click",".deletar",function(event){
            var id = $(this).parent().parent().find(".contactId").val();
            var r= confirm("Este contato será apagado!");
            if (r==true){
                delete_contact(id);
            }else{
                alert("Operação cancelada!");
            }
            
        });
    });
    
    function save_contact(){
        contact = {}
        contact.name = $("#name").val();
        contact.phone = $("#phone").val();
        contact.operator = $("#operator").val();
        if($("#contactId").val() != null && $("#contactId").val() != ""){
            contact.id = $("#contactId").val();
            update(contact);
        }else
            save(contact);
    }
    function update(contact){
         $.ajax({
            url: "/contatos/update",
            data: {contact},
            type: "PUT", 
            success: function(result){
                update_contacts();
            }
        });
    }


    function delete_contact(id){
        $.ajax({
            url: "/contatos/delete/"+id,
            type: "delete", 
            success: function(result){
                update_contacts();
            }
        });
    }

    function save(contact){
        $.ajax({
            url: "/contatos/save",
            data: {contact},
            type: "POST", 
            success: function(result){
                update_contacts();
            }
        });
    }

    function update_contacts(){
        $.ajax({
            url: "/contatos/getAll",
            type: "GET", 
            success: function(result){
                contacts = "";
                result.contacts.forEach(contact => {
                    contacts = contacts + create_li(contact)
                });
                $("#contatos").html(contacts)
            }
        });

    }

    function test_contacts(){
        if($( "#contacts li" ).length == 0){
            $("#contacts").val("Nenhum contato encontrado");
        }
    }
    function create_li(contact){
        return " <li class='contato'>"+
            "<div class='collapsible-header row'><i class='material-icons' style='font-size: 30px'>account_box</i>"+contact.name+"</div>"+
               " <div class='collapsible-body'>"+
               "<input class='contactId' type='hidden' name='id' value='"+contact.id+"'></input>"+
                "Nome: <span class='name'>"+contact.name+"</span><br>"+
                "Telefone: <span class='phone'>"+contact.phone+"</span><br>"+
                "Operadora: <span class='operator'>"+contact.operator+"</span>"+
                "<div class='row'>"+
                        "<a class='editar waves-effect waves-light btn col offset-s10 s1 modal-trigger' href='#cadastro'>Editar</a>"+
                        "<a class='deletar waves-effect waves-light btn col s1 red darken-2' >Deletar</a>"+
                "</div>"+
            "</div>"+
        "</li>"
    }


</script>