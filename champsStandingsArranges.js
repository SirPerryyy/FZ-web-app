let driversStandingsTable;
let constructorsStandingsTable;

async function StandingsDataLoad() {
    
    const response1 = await fetch('Datas/RaceHistory/Championships_Driver_Record.json');
    const response2 = await fetch('Datas/RaceHistory/Championships_Teams_Record.json');

    driversStandingsTable = await response1.json();
    constructorsStandingsTable = await response2.json();

    const select = document.querySelector(".champs");

    select.addEventListener("change", (event) => {
        ArrangeDataStory(event.target.value);
    });

    ArrangeDataStory(1);
}

function ArrangeDataStory(champ) 
{
    const tables = document.querySelectorAll(".table");

    if (driversStandingsTable == null && constructorsStandingsTable == null) 
    {
        console.error("Data are not loaded yet.");
        return;
    }
    const seasonN = document.querySelector(".seasonN");
    seasonN.innerHTML = `SEASON ${champ}`;


    LoadDriverStandingsStoryTable(tables[0], champ);
    LoadConstructorStandingsStoryTable(tables[1], champ)
}

function LoadDriverStandingsStoryTable(table, champ){

        const row = table.querySelectorAll(".table-row");
        const datas = driversStandingsTable[champ - 1];
        
        let index = 0;
        row.forEach(rowElement => {
            rowElement.style.display = "grid";
            rowElement.style.borderBottom = "1px solid #c2c2c2";
            const name = rowElement.querySelector(".table-name");
            const team = rowElement.querySelector(".table-team");
            const points = rowElement.querySelector(".table-points");

            if (datas.Drivers[index] == null) {
                rowElement.style.display = "none";
                return;
            }
            
            if(datas.Drivers[index + 1] == null){
                rowElement.style.borderBottom = "none";
            }

            name.innerText = datas.Drivers[index].driver;
            team.innerText = datas.Drivers[index].team;
            team.style.color = datas.Drivers[index].teamColor;
            points.innerText = datas.Drivers[index].points;

            if (index === 0) {
                points.style.color = "rgba(255, 217, 0, 0.64)"; 
            }
            index++;
        });

}

function LoadConstructorStandingsStoryTable(table, champ)
{
        const row = table.querySelectorAll(".tableTeam-row");
        const datas = constructorsStandingsTable[champ - 1];
        
        let index = 0;
        row.forEach(rowElement => {
            rowElement.style.display = "grid";
            rowElement.style.borderBottom = "1px solid #c2c2c2";

            const name = rowElement.querySelector(".table-tname");
            const points = rowElement.querySelector(".table-points");

            if (datas.Teams[index] == null) {
                rowElement.style.display = "none";
                return;
            }
            
            if(datas.Teams[index + 1] == null){
                rowElement.style.borderBottom = "none";
            }

            name.innerText = datas.Teams[index].team;
            points.innerText = datas.Teams[index].points;

            if (index === 0) {
                points.style.color = "rgba(255, 217, 0, 0.64)"; 
            }
            index++;
        });
}