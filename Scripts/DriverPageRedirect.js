

function RedirectToProfile(driverID)
{
    window.location.href = `DriverProfile.html?id=${driverID}`;
}

async function LoadProfile()
{
    const driverName = document.querySelector('.driverPanelName');
    const pageName =  document.querySelector('.currentName');

    const response = await fetch('./Datas/Drivers/DriverStats.json');
    const data = await response.json();  

    const params = new URLSearchParams(window.location.search);
    const driverID = params.get("id");

    const driver = data[driverID];

    if (driver === undefined) {
        driverName.innerText = "Error loading driver data : DRIVER NOT FOUND";
        pageName.innerText = "DRIVER NOT FOUND";
        console.error("Driver data not found for ID:", driverID);
        return;
    }

    console.log(driverID);

    const flag = document.querySelector('.nationalityFlag');
    const nationality = document.querySelector('.nationality');
    const team = document.querySelector('.team');
    const pastTeams = document.querySelector('.pastTeams');
    const bioBackgr = document.querySelector('.driverPanelDriverBiography');
    const backgroundGrad = document.querySelector('.driverPanelDriverImageBackground');
    const driverImage = document.querySelector('.driverPanelDriverImage');
    const driverNumber = document.querySelector('.driverPanelDriverNumber');

    const champs = document.querySelector('.championships');
    const wins = document.querySelector('.raceWins');
    const rcAtt = document.querySelector('.raceAttended');
    const podiums = document.querySelector('.podiums');
    const bestPos = document.querySelector('.raceBestPos');
    const seasons = document.querySelector('.seasons');
    const points = document.querySelector('.points');
    const dnfs = document.querySelector('.dnfs');

    const ovrValue = document.querySelector('.ovrValue');
    const attValue = document.querySelector('.attValue');
    const expValue = document.querySelector('.expValue');
    const pacValue = document.querySelector('.pacValue');
    const qlfValue = document.querySelector('.qlfValue');
    const stgValue = document.querySelector('.stgValue');
    const fplValue = document.querySelector('.fplValue');
    const defValue = document.querySelector('.defValue');
    const cnsValue = document.querySelector('.cnsValue');
    const fylValue = document.querySelector('.fylValue');
    const rfxValue = document.querySelector('.rfxValue');
    const constrTitl = document.querySelector('.constrTitles');

    constrTitl.innerText = driver.constrTitles;

    ovrValue.innerText = driver.driverPanelPointsOVR.value;
    ovrValue.style.color = driver.driverPanelPointsOVR.color;
    
    attValue.innerText = driver.attValue;
    expValue.innerText = driver.expValue;
    pacValue.innerText = driver.pacValue;
    qlfValue.innerText = driver.qlfValue;
    stgValue.innerText = driver.stgValue;
    fplValue.innerText = driver.fplValue;
    defValue.innerText = driver.defValue;
    cnsValue.innerText = driver.cnsValue;
    fylValue.innerText = driver.fylValue;
    rfxValue.innerText = driver.rfxValue;

    champs.innerText = driver.allTimeStats.championships;
    wins.innerText = driver.allTimeStats.wins;
    rcAtt.innerText = driver.allTimeStats.raceAttended;
    podiums.innerText = driver.allTimeStats.podiums;
    bestPos.innerText = driver.allTimeStats.raceBestPos;
    seasons.innerText = driver.allTimeStats.seasons;
    points.innerText = driver.allTimeStats.points;
    dnfs.innerText = driver.allTimeStats.dnfs;

    driverNumber.innerText = driver.driverInfo.driverNumber;
    driverNumber.style.color = driver.driverInfo.nameColor;
    pageName.innerText = driver.driverInfo.name;
    driverName.innerText = driver.driverInfo.name;
    driverName.style.color = driver.driverInfo.driverTeamMainColor;

    backgroundGrad.style.background = driver.driverInfo.backgroundGradient;
    driverImage.src = driver.driverInfo.driverImage;

    flag.src = driver.driverPanelDriverBiography.nationalityFlag;
    nationality.innerText = driver.driverPanelDriverBiography.nationality;
    nationality.style.color = driver.driverPanelDriverBiography.textColor;
    team.innerText = driver.driverPanelDriverBiography.team;
    team.style.color = driver.driverPanelDriverBiography.textColor;
    pastTeams.innerText = driver.driverPanelDriverBiography.pastTeams;
    pastTeams.style.color = driver.driverPanelDriverBiography.textColor;
    bioBackgr.style.backgroundColor = driver.driverInfo.nameColor;
    
}
function GetDriver()
{
    return currentDriver;
}
function Test(driver)
{
    console.log(driver);
}
console.log("SCRIPT LOADED");