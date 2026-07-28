let picturesContainer
let picsLabels

function ClosePanelRaceCalendar() 
{
    const modalOverlay = document.querySelector('.modal-overlayCal');
    const panelRaceCalendar = document.querySelector('.panelRaceCalendar');

    modalOverlay.style.display = 'none';
    panelRaceCalendar.style.display = 'none';
    
    if(screen.width < 760)
    {
        const HeaderMobile = document.querySelector('.bottomHeaderMobile')
        HeaderMobile.style.display = 'inline'
    }

    ToggleImagesVisibility(-1, true)
}
let previousImgsPaths = ['', '', '', '', '', '']

async function LoadRaceDataCal(raceToFind, season = "")
{

    picturesContainer = document.querySelectorAll('.picturesContainer')
    picsLabels = document.querySelectorAll('label')

    const response = await fetch(`Datas/RaceHistory/races${season}.json`);
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

    const HeaderMobile = document.querySelector('.bottomHeaderMobile')
    HeaderMobile.style.display = 'none'

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

    previousImgsPaths[0] = Race1.Img1Path
    previousImgsPaths[1] = Race1.Img2Path
    previousImgsPaths[2] = Race1.Img3Path

    PopulateRace(rowRaces[0].querySelectorAll('.table-row-race'), Race1);

    if(Race2 == undefined)
    {   
        picsLabels[1].style.display = "none"
        rowRaces[1].style.display = "none";
        return;
    }
    
    picsLabels[1].style.display = "block"
    rowRaces[1].style.display = "block";
    raceName[1].innerHTML = Race2.RaceTitle;
    raceFlag[1].src = Race1.FlagURL;

    previousImgsPaths[3] = Race2.Img1Path
    previousImgsPaths[4] = Race2.Img2Path
    previousImgsPaths[5] = Race2.Img3Path

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
function ToggleImagesVisibility(index, reset = false){

    if(reset)
    {
        picturesContainer[0].style.display = 'none'
        picturesContainer[1].style.display = 'none'
        return;
    }

    const isVisible = (picturesContainer[index].style.display == 'flex')

    if(isVisible)
    {
        picturesContainer[index].style.display = 'none'
    }
    else
    {
        const images = document.querySelectorAll('.picturesContainer img')

        images[0].src = previousImgsPaths[0] 
        images[1].src = previousImgsPaths[1] 
        images[2].src = previousImgsPaths[2] 
        
        if(picsLabels[1].style.display != 'none')
        {
            images[3].src = previousImgsPaths[3] 
            images[4].src = previousImgsPaths[4] 
            images[5].src = previousImgsPaths[5]
        }
        picturesContainer[index].style.display = 'flex'
    }
}