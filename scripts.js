function CopyClipboard() {
            const email = "simonepappalardi0@gmail.com";
            navigator.clipboard.writeText(email)
                .then(() => {
                    alert("Email copied!");
                })
                .catch(err => {
                    alert("Errore nella copia: " + err);
                });
        }
function SwitchToCalendar()
        {
            window.location.href = "CalendarPage.html";
        }
function SwitchToDrivers()
        {
            window.location.href = "Drivers.html";
        }
function SwitchToStandings()
        {
            window.location.href = "index.html";
        }
function SwitchToStory()
{
    window.location.href = "Story.html";
}
function Order()
        {
const panel = document.querySelector('.panel'); 
const teamPanel = document.querySelector('.teamPanel')
const rows = Array.from(panel.querySelectorAll('.row'));
const teamRows = Array.from(teamPanel.querySelectorAll('.rowTeams'));

rows
  .sort((a, b) => {
      const pointsA = parseInt(a.querySelector('.points').innerText);
      const pointsB = parseInt(b.querySelector('.points').innerText);
      return pointsB - pointsA;
  })
  .forEach((row, index) => {
      panel.appendChild(row);
      row.querySelector('.pos').innerText = index + 1;
  });

teamRows
  .sort((c, d) => {
      const pointsC = parseInt(c.querySelector('.teamPoints').innerText);
      const pointsD = parseInt(d.querySelector('.teamPoints').innerText);
      return pointsD - pointsC;
  })
  .forEach((rowTeams, indexV) => {
      teamPanel.appendChild(rowTeams);
      rowTeams.querySelector('.teamPos').innerText = indexV + 1;
  });
}
function toggleMenu() {
    document.querySelector('.navMobileContainer').classList.toggle('active');
}
console.log("SCRIPT LOADED");