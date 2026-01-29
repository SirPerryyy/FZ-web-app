using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace FzWebSite_Races_Data_Compiler
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void doubleFlagCheck(object sender, EventArgs e)
        {
            CheckBox[] checkBoxes = { checkBox1, checkBox2, checkBox3, checkBox4, checkBox5, checkBox6, checkBox7, checkBox8, checkBox9 };
            int checkCount = 0;

            foreach (CheckBox checkBox in checkBoxes)
            {
                if (checkBox.Checked)
                {
                    checkCount++;

                    if (checkCount == 2)
                    {
                        if (MessageBox.Show("You have more than one FL check flagged. Do you wish to keep your last one?", "FL double check detected", MessageBoxButtons.YesNo) == DialogResult.No)
                            checkBox.Checked = false;
                        break;
                    }
                }

            }
        }

        private static Dictionary<int, int> PosPoints()
        {
            Dictionary<int, int> posPoints = new Dictionary<int, int>();
            posPoints.Add(1, 25);
            posPoints.Add(2, 21);
            posPoints.Add(3, 18);
            posPoints.Add(4, 15);
            posPoints.Add(5, 10);
            posPoints.Add(6, 5);
            posPoints.Add(7, 1);
            posPoints.Add(8, 0);
            posPoints.Add(9, 0);

            return posPoints;
        }
        private static Dictionary<string, string> DriverTeam()
        {
            Dictionary<string, string> dT = new Dictionary<string, string>();

            dT.Add("Sir Perry", "flexboxMercedes");
            dT.Add("Doggy", "flexboxMercedes");
            dT.Add("Kimi Fernandes", "flexboxLotus");
            dT.Add("Alvaro Preguica", "flexboxLotus");
            dT.Add("Pablo Carpincho", "flexboxWilliams");
            dT.Add("Twenty Miles", "flexboxWilliams");
            dT.Add("Bobbi", "flexboxRedbull");
            dT.Add("Luca", "flexboxRedbull");
            dT.Add("Pier La Mert", "flexboxBrawn");

            return dT;
        }
        
        private List<DriverRace> CreateDrivers(ComboBox[] comboBoxes, TextBox[] timeBoxes, CheckBox[] checkBoxes)
        {
           
            var drivers = new List<DriverRace>();
            Dictionary<string, string> drivTeam = DriverTeam();
            Dictionary<int, int> posPoint = PosPoints();

                for (int i = 0; i < comboBoxes.Length; i++)
                {
                    if (comboBoxes[i].SelectedItem != null)
                    {
                        drivers.Add(new DriverRace
                        {
                            DriverName = comboBoxes[i].SelectedItem.ToString(),
                            DriverTime = timeBoxes[i].Text,
                            HasFL = checkBoxes[i].Checked,
                            DriverPoints = $"+{posPoint[i + 1] + (checkBoxes[i].Checked == true ? 1 : 0)}",
                            DriverTeamFlexBox = drivTeam[comboBoxes[i].SelectedItem.ToString()]
                        });
                    }
                    else
                    {
                        MessageBox.Show("ONE OR MORE DRIVER BOXES WERE NULL!");
                    }
                }
                return drivers;

        }
        
        private void button1_Click(object sender, EventArgs e)
        {
            if (textBox1.Text == null || textBox2.Text == null)
            {
                MessageBox.Show("FILL ALL THE GAPS BEFORE CONTINUING!");
                return;
            }
            string raceTitle = textBox1.Text;
            string flagURL = textBox2.Text;

            string img1RelPath = textBox3.Text;
            string img2RelPath = textBox4.Text;
            string img3RelPath = textBox5.Text;
            string img4RelPath = textBox6.Text;

            string path = @"C:\Users\simon\Downloads\FzWebSite\Datas\RaceHistory\races.json";

            List<DriverRace> drivers = CreateDrivers(
                new ComboBox[]
                {
                comboBox1, comboBox2, comboBox3,
                comboBox4, comboBox5, comboBox6,
                comboBox7, comboBox8, comboBox9
                },
                new TextBox[]
                {
                    driverTime1, driverTime2, driverTime3,
                    driverTime4, driverTime5, driverTime6,
                    driverTime7, driverTime8, driverTime9
                },
                new CheckBox[]
                {
                    checkBox1, checkBox2, checkBox3,
                    checkBox4, checkBox5, checkBox6,
                    checkBox7, checkBox8, checkBox9
                }
            );
            if (drivers.Count < 9 )
            {
                MessageBox.Show("FILL ALL THE GAPS BEFORE CONTINUING!");
                return;
            }

            Race race = (new Race {
                RaceTitle = raceTitle,
                FlagURL = flagURL,
                Img1Path = img1RelPath,
                Img2Path = img2RelPath,
                Img3Path = img3RelPath,
                Img4Path = img4RelPath,

                Drivers = drivers,
            });

            List<Race> finalList = new List<Race>();
            
            finalList.Add(race);

            if (File.Exists(path))
            {
                List<Race> currentList = JsonConvert.DeserializeObject<List<Race>>(File.ReadAllText(path)) ?? new List<Race>();
                foreach (Race r in currentList)
                {
                    finalList.Add(r);
                }
            }

            File.WriteAllText(path, JsonConvert.SerializeObject(finalList, Formatting.Indented));

            MessageBox.Show("Files stored corrrectly!");
        }
    }
}
