$(document).ready(function(){
    var url = "https://api.covid19india.org/data.json"

    $.getJSON(url, function(data){
        
        var total_active, total_confirmed, total_death, total_recovered

        var state = []
        var confirmed = []
        var deaths = []
        var recovered = []

        $.each(data.statewise,function(id,obj){
            state.push(obj.state)
            confirmed.push(obj.confirmed)
            deaths.push(obj.deaths)
            recovered.push(obj.recovered)
        })

        state.shift()
        confirmed.shift()
        deaths.shift()
        recovered.shift()
        
        console.log(state)

        total_active = data.statewise[0].active
        total_confirmed = data.statewise[0].confirmed
        total_death = data.statewise[0].deaths
        total_recovered = data.statewise[0].recovered
        
        $('#active').append(total_active)
        $('#confirm').append(total_confirmed)
        $('#death').append(total_death)
        $('#recover').append(total_recovered)


        SelectedState =function(){

            var chart = document.getElementById("chart").getContext('2d')
     
             var newchart = new Chart(chart,{
                 type: 'line',
                 data:{
                     labels:state,
                     datasets:[
                         {
                             label: "Confirmed Cases",
                             data: confirmed,
                             backgroundColor: '#f1c40f',
                             minBarLength: 100
                         },
                         {
                             label: "Recovered Cases",
                             data: recovered,
                             backgroundColor: '#2ecc71',
                             minBarLength: 100
                         },
                         {
                             label: "Deceased Cases",
                             data: deaths,
                             backgroundColor: '#e74c3c',
                             minBarLength: 100
                         }
                     ]
                 },
                 options:{}
             })}        


        let dropdown = $('#dropdown-list');

        dropdown.empty();
        
        dropdown.append('<option selected="true" disabled>Choose State</option>');
        dropdown.prop('selectedIndex', 0);
        
                
        // Populate dropdown with list of provinces
        $.getJSON(url, function (data) {
          $.each(data, function (key, entry) {

            var state = []
            var stateCode = []
            $.each(data.statewise,function(id,obj){
                state.push(obj.state)
                stateCode.push(obj.statecode)
            });
            state.shift()
            stateCode.shift()
            var i;
            for (i = 0; i <= 36; i++) {
                dropdown.append($('<option class="dropdown-item" onclick="SelectedState()"></option>').attr('value',stateCode[i]).text(state[i]));                
            }
            

            
          })
        });


    })



})