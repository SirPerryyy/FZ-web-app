using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FzWebSite_Races_Data_Compiler
{
    internal class DriverRace
    {
        public string? DriverName {  get; init; }
        public string? DriverTeamFlexBox { get; init; }
        public string? DriverTime { get; init; }
        public string? DriverPoints { get; init; }
        public bool? HasFL {  get; init; }
    }
}
