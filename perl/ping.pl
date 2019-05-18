#!/usr/bin/perl -w
	#Ce script sert à lancer les tests Ping (RTT) en l'envois des résultats
		#Définition des bibliothèques utilisées 
	#-----------------------------------------------------------------------------------------	
use strict;
use warnings;
use 5.012;
use CGI;
use URI::Escape;
use Carp; 
my $cgi = new CGI;
use utf8; 
use CGI::Carp qw(fatalsToBrowser); 

#-----------------------------------------------------------------------------------------	
		#Définition des constantes utilsée
	#-----------------------------------------------------------------------------------------	

use constant false => 0;
use constant true  => 1;
#-----------------------------------------------------------------------------------------	
		#Définition des variables
	#-----------------------------------------------------------------------------------------	
my $param = $cgi->{param};
my $lab = $cgi->param('lab');
my $OptionT = $cgi->param('OptionT');
my $OptionC = $cgi->param('OptionC');
my $OptionCText = $cgi->param('OptionCText');
my $OptionW = $cgi->param('OptionW');
my $OptionWText = $cgi->param('OptionWText');
my $OptionS = $cgi->param('OptionS');
my $OptionSText = $cgi->param('OptionSText');
my $Interface = $cgi->param('Interface');
my $OptionD = $cgi->param('OptionD');
my $value;
my $Options ;
#-----------------------------------------------------------------------------------------	
		#Récupération des options du test
	#-----------------------------------------------------------------------------------------	
$Options = $Options . " -I $Interface";

if ($OptionT eq 'true') 
{
$Options = $Options . " -c 1";
}
else
{
	if ($OptionC eq 'true') 
	{
	$Options = $Options ." -c 1";
	}
	else 
	{
	$Options = $Options . " -c 1";
	}
}

if ($OptionW eq 'true') 
{
$Options = $Options . " -W $OptionWText";
}
if ($OptionS eq 'true') 
{
$Options = $Options . " -s $OptionSText";
}

if ($OptionD eq 'true') 
{
$Options = $Options . " -M do ";
}

#-----------------------------------------------------------------------------------------	
		#Exécution de la commande en prenant en compte les options
	#-----------------------------------------------------------------------------------------	
$value = qx(ping  $Options $lab);
#-----------------------------------------------------------------------------------------	
		#Envois des résultats
	#-----------------------------------------------------------------------------------------	
print $value;

$cgi->header('text/plain;charset=UTF-8');



