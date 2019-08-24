  fetch('https://netvu.xln.me/lp')
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
       document.getElementById("all-devices").innerHTML=res.devices.length;  
       document.getElementById("online-devices").innerHTML=res.devices.length;  
       document.getElementById("offline-devices").innerHTML=res.devices.length;        
      var devices=res.devices
  var row=[]

for(i in devices){
   row.push([devices[i].Name,devices[i].Ip,devices[i].Mac,devices[i].Vendor,devices[i].Status]);
}    
$(document).ready(function() {
    $('#dtable').DataTable({
        searching: false,
        paging:false,
        "bInfo" : false,
        data: row,
        columns: [
            { title: "Name" },
            { title: "IP" },
            { title: "MAC" },
            { title: "Vendor" },
            { title: "Status" }]
  
    });
});

      
      });



  