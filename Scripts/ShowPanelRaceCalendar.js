

function ClosePanelRaceCalendar() 
{
    const modalOverlay = document.querySelector('.modal-overlayCal');
    const panelRaceCalendar = document.querySelector('.panelRaceCalendar');

    modalOverlay.style.display = 'none';
    panelRaceCalendar.style.display = 'none';
}

async function LoadRaceDataCal(raceToFind)
{
    const response = await fetch('Datas/RaceHistory/races.json');
    const data = await response.json();
    let Race1;
    let Race2;
    for(let i = 0; i < data.length; i++)
    {
        if(data[i].RaceTitle.includes(raceToFind))
        {
            if(Race1 == undefined)
            {
                Race1 = data[i];
                continue;
            }
            Race2 = data[i];
        }
    }
    
    if(Race1 == undefined) {return;}

    const modalOverlay = document.querySelector('.modal-overlayCal');
    const panelRaceCalendar = document.querySelector('.panelRaceCalendar');

    modalOverlay.style.display = 'block';
    panelRaceCalendar.style.display = 'inline';

    let fixedPixels = 150;
    if(Race2 != undefined)
    {
        fixedPixels = 15;
    }
    panelRaceCalendar.style.top = window.scrollY + fixedPixels + 'px';

    //Populate panel

    const rowRaces = document.querySelectorAll('.row-race')
    const raceName = document.querySelectorAll('.circuitName')
    const raceFlag = document.querySelectorAll('.raceFlag');

    raceName[0].innerHTML = Race1.RaceTitle;
    raceFlag[0].src = Race1.FlagURL;

    PopulateRace(rowRaces[0].querySelectorAll('.table-row-race'), Race1);

    if(Race2 == undefined)
    {   
        rowRaces[1].style.display = "none";
        return;
    }
    
    rowRaces[1].style.display = "block";
    raceName[1].innerHTML = Race2.RaceTitle;
    raceFlag[1].src = Race1.FlagURL;

    PopulateRace(rowRaces[1].querySelectorAll('.table-row-race'), Race2)
}

function PopulateRace(row, data)
{
    let driverIndex = 0;

    row.forEach((tableRow) => {
            const nameRow = tableRow.querySelector('.name');
            
            const driverName = tableRow.querySelector('.driverName');
            const driverFL = tableRow.querySelector('.lap');
            const driverPoints = tableRow.querySelector('.points');
            const flexBox = tableRow.querySelector('.flexboxClass');
            
            const currentDriver = data.Drivers[driverIndex];
            if(currentDriver === undefined) 
            {  
                const tablePanel = document.querySelector('.panelRaceCalendar')
                tableRow.style.display = "none";
                return;
            }
        
            driverName.innerHTML = currentDriver.DriverName;
            flexBox.innerHTML = "<span class='" + currentDriver.DriverTeamFlexBox + "'></span>";
            driverPoints.textContent = currentDriver.DriverPoints;
            driverFL.style.color = "white";
            driverFL.textContent = currentDriver.DriverTime;
            if (currentDriver.HasFL)
            {
                driverFL.style.color = "purple";
            }

            driverIndex++;
        });
}