import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

//I know my keys are exposed but for the low number of traffic on my site
//I have no intention to create an authentication system, or the founds to create a proper backend
//and also github pages does not like .env files. It would be cool to create 
//an auth system to allow push notifications for example, neverthless there's no need
//since the low traffic.
const supabaseUrl = "https://dhtnntmxtfksvjvktwju.supabase.co";
const supabaseKey = "sb_publishable_BVlTv8E4LcYMv2MeA1u4jA_tIXvmdlL";
const supaClient = createClient(supabaseUrl, supabaseKey);

function SupaClientGlobal()
{
    window.SupaClientRef = supaClient;
}

SupaClientGlobal()

FetchDataFromDatabase()

