let DataPage = {};
let totalPages = 0;
let currentPage = 1;


async function ArrangeDataInPage(debug=false) 
{
    const response = await fetch('Datas/RaceHistory/races.json');
    const data = await response.json();

    const race = data[0]; //gara

    let currentIndex = 0;

    for (let page = 1; currentIndex <= data.length - 1; page++)
    {
        totalPages++;
        DataPage[page] = [];
        
        for(let i = 0; i < 3; i++)
        {
            
            if(currentIndex <= data.length - 1)
            {
                DataPage[totalPages].push(data[currentIndex]);

                currentIndex++;
                if(debug)
                {
                    console.log(DataPage[totalPages]);
                }
            }
            else
            {
                break;
            }
        }
    }

    //Page Creation

    const pagesClass = document.querySelector('.pagesNumbers');
    const customPageSelector = document.querySelector('.customPageSelector');
    const pageNavigation = document.querySelector('.pageNavigation');

    if(totalPages <= 2)
    {
        pageNavigation.removeChild(customPageSelector);
    }

    for(let i = 1; i <= totalPages; i++)
    {
            if(i == 3)
            {
                const lastPage = document.querySelector('.lastPage');
                lastPage.style.display = "inline"
                lastPage.textContent = totalPages;
                lastPage.addEventListener('click', () => {
                    LoadPage(totalPages);
                });
                break;
            }
            const button = document.createElement("button");
            button.textContent = `${i} `;
            button.addEventListener('click', () => {
                LoadPage(i);
            });
            pagesClass.appendChild(button);
    }
    LoadPage(1);
}
let numberInput;
function CustomPageTextBox()
{
    const pageSelectorClass = document.querySelector('.pagesSelector')
    const numberInputField = document.querySelector('.numberInput');
    
    numberInput = numberInputField
    numberInputField.max = totalPages;

    switch (pageSelectorClass.style.display)
    {
        case "":
        pageSelectorClass.style.display = "flex"
        break;
        case "none":
            pageSelectorClass.style.display = "flex"
            break
        case "flex":
            pageSelectorClass.style.display = "none"
            break
    }
}
function LoadCustomPage()
{
    const customPageNumber = numberInput.value;

    if(customPageNumber <= totalPages && customPageNumber > 0)
    {
        LoadPage(customPageNumber)
        return;
    }

}
function LoadPage(pageNumber)
{
    const raceRow = document.querySelectorAll('.row-race');
    let index = 0;

    currentPage = pageNumber;

    raceRow.forEach(row => {
        
        if(DataPage[pageNumber][index] === undefined)
        {
            row.style.display = "none";
            return;
        }
        if (row.style.display === "none")
        {
            row.style.display = "block";
        }
        const raceFlag = row.querySelector('.raceFlag');
        const raceName = row.querySelector('.circuitName');
        
        raceFlag.src = DataPage[pageNumber][index].FlagURL;
        raceName.innerHTML = DataPage[pageNumber][index].RaceTitle;

        const tableRows = row.querySelectorAll('.table-row');
        let driverIndex = 0;

        tableRows.forEach((tableRow) => {
            const nameRow = tableRow.querySelector('.name');
            const driverName = nameRow.querySelector('.driverName');
            const driverFL = tableRow.querySelector('.lap');
            const driverPoints = tableRow.querySelector('.points');
            const flexBox = nameRow.querySelector('.flexboxClass');
            
            const currentDriver = DataPage[pageNumber][index].Drivers[driverIndex];
            if(currentDriver === undefined) 
            {  
                    const tablePanel = row.querySelector('.table-panel')
                    tableRow.style.display = "none";
                    if (screen.width <= 378) {
                        tablePanel.style.height = '342px';
                        return;
                    }
                    tablePanel.style.height = '362px';
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

        const images = row.querySelectorAll('.raceImage');

        images[0].src = DataPage[pageNumber][index].Img1Path;
        images[1].src = DataPage[pageNumber][index].Img2Path;
        images[2].src = DataPage[pageNumber][index].Img3Path;

        driverIndex = 0;
        index++;
    });

    const thisPageSpan = document.querySelector('.thisPage');
    thisPageSpan.innerHTML = `Currently viewing page ${currentPage}`;
}
function NextPage()
{
    if(currentPage <= totalPages)
    {
        currentPage++;
        LoadPage(currentPage);
    }
}
function PreviousPage()
{
    if(currentPage > 1)
    {
        currentPage--;
        LoadPage(currentPage);
    }
}
function LogData(pageNumber)
{     
    console.log(DataPage[pageNumber]);
}