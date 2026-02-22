import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

//If you're reading this, and you know what this stuff down here is, please
//since this site is hosted in github pages than i cant create any .env file, 
//so i have to put the API key and URL here, but please dont use it for anything bad,
//this is just for this website.
const supabaseUrl = "https://dhtnntmxtfksvjvktwju.supabase.co";
const supabaseKey = "sb_publishable_BVlTv8E4LcYMv2MeA1u4jA_tIXvmdlL";
const supaClient = createClient(supabaseUrl, supabaseKey);

export var DataStarDriver = [];

function SupaClientGlobal()
{
    window.SupaClientRef = supaClient;
}

SupaClientGlobal()

FetchDataFromDatabase()

