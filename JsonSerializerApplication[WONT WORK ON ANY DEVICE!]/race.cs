using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FzWebSite_Races_Data_Compiler
{
    internal class Race
    {
        public string? RaceTitle { get; init; }
        public string? FlagURL { get; init; }
        public string? Img1Path { get; init; }
        public string? Img2Path { get; init; }
        public string? Img3Path { get; init; }
        public string? Img4Path { get; init; }
        public List<DriverRace>? Drivers { get; set; }
    }
}
