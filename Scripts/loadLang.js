let langJson

async function SetlangJsonVariable()
{
    if(langJson === undefined || langJson === null)
    {
        langJson = await ReturnLangFile(GetLangPrefID());
    }
}

function LoadLangGlobal()
{
    console.log("Loading lang: " + localStorage.getItem('langID') + ' | ' +  langJson)

    const thisSection = langJson.Global;

    const standButton = document.querySelector('.standingsButton');
    const drivButton = document.querySelector('.driversButton');
    const calButton = document.querySelector('.calendarButton');
    const donButton = document.querySelector('.donationsButton');

    const navButton = document.querySelector('.menu-button');

    const mobileButtons = document.querySelectorAll('.navMobileButton');

    const donationButtonMob = document.querySelector('.donationsButtonMobile');

    standButton.innerText = thisSection.button_standings;
    drivButton.innerText = thisSection.button_drivers;
    calButton.innerText = thisSection.button_calendar;
    donButton.innerText = thisSection.button_donate;
    donationButtonMob.innerText = thisSection.button_donate;

    navButton.innerText = thisSection.button_navigate;
    mobileButtons[0].innerText = thisSection.button_calendar;
    mobileButtons[1].innerText = thisSection.button_drivers;

}

async function LoadLangIndex()
{
    await SetlangJsonVariable();

    if (localStorage.getItem('landID') != 'it') return;

    LoadLangGlobal()
    
    const page = langJson.IndexPage;

    const container = document.querySelector('.container')
    const titles = document.querySelectorAll('h2')
    titles[0].innerText = page.standings_driver
    titles[1].innerText = page.standings_constr

    const tableheaders = document.querySelectorAll('.table-header')

    tableheaders[0].innerHTML = page.table_header_drivers
    tableheaders[1].innerHTML = page.table_header_teams
       
    const panelStory = document.querySelector('.panel-story')

    const storySpan = panelStory.querySelector('span')
    storySpan.innerText = page.story_invite;

    const racepanel = document.querySelector('.panel-races')
    const title = racepanel.querySelector('h2')
    title.innerText = page.race_history
}
async function GlobalLoadLang()
{
    await SetlangJsonVariable();

    if (localStorage.getItem('landID') != 'it') return;

    LoadLangGlobal()
}
async function LoadLangDrivProf()
{
    await SetlangJsonVariable();

    if (localStorage.getItem('landID') != 'it') return;

    LoadLangGlobal()
    
    const page = langJson.DriverProfilePage;

    const statsTitle = document.querySelector('.driverPanelAllTimeStatsTitle')
    const statsDrivDet = document.querySelectorAll('.driverPanelAllTimeStatsDetails')

    
    console.log(statsDrivDet)
    statsTitle.innerText = page.stats_title 
    
    statsDrivDet[0].innerHTML = page.stats_driv_titles + ": <span class=\"championships\">x</span><span class=\"advDetail\">/3</span>"
    statsDrivDet[1].innerHTML = page.stats_constr_titles + ":  <span class=\"constrTitles\">x</span><span class=\"advDetail\">/3</span>"
    statsDrivDet[2].innerHTML = page.stats_career_wins + ": <span class=\"raceWins\">x<span class=\"advDetail\">/53</span></span>"
    statsDrivDet[3].innerHTML = page.stats_race_entered + ": <span class=\"raceAttended\">x</span><span class=\"advDetail\">/53</span>"
    statsDrivDet[4].innerHTML = page.stats_podiums + ": <span class=\"podiums\">x</span><span class=\"advDetail\"></span>"
    statsDrivDet[5].innerHTML = page.stats_best_champ_pos + "<span class=\"raceBestPos\">x</span><span class=\"advDetail\"></span>"
    statsDrivDet[6].innerHTML = page.stats_seasons + ": <span class=\"seasons\">x</span><span class=\"advDetail\">/3</span>"
    statsDrivDet[7].innerHTML = page.stats_points + ": <span class=\"points\">x</span><span class=\"advDetail\"></span>"
    statsDrivDet[8].innerHTML = page.stats_dnfs + ": <span class=\"dnfs\">x</span><span class=\"advDetail\">/53</span>"

}

async function LoadLangTeamPage()
{
    await SetlangJsonVariable();

    if (localStorage.getItem('landID') != 'it') return;

    LoadLangGlobal()
}

async function LoadLangStory()
{
    await SetlangJsonVariable();

    if (localStorage.getItem('landID') != 'it') return;

    LoadLangGlobal()
} 

function SaveLangPref(iD)
{
    localStorage.setItem('langID', iD)
}

function GetLangPrefID()
{
    if(localStorage.getItem('langID') == null)
    {
        var userLang = navigator.language || navigator.userLanguage;
        if(userLang == 'it')
        {
            localStorage.setItem('langID', userLang);
        }
        else
        {
            localStorage.setItem('langID', 'en');
        }
    }
    return localStorage.getItem('langID')
}

async function ReturnLangFile(langID)
{
    const response = await fetch(`./Lang/${langID}.json`)
    return response.json();
} 

async function LogLang()
{
    console.log(await ReturnLangFile('it'))
}