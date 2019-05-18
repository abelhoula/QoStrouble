#!/usr/bin/perl -w
#Ce script sert à lancer un test traceroute
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
use IO::Socket::INET;

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

my $OptionN = $cgi->param('OptionN');

my $OptionW = $cgi->param('OptionW');
my $OptionWText = $cgi->param('OptionWText');

my $OptionP = $cgi->param('OptionP');
my $OptionPText = $cgi->param('OptionPText');

my $OptionM = $cgi->param('OptionM');
my $OptionMText = $cgi->param('OptionMText');

my $OptionF = $cgi->param('OptionF');

my $OptionI = $cgi->param('OptionI');

my $OptionT = $cgi->param('OptionT');

my $OptionU = $cgi->param('OptionU');

my $Interface = $cgi->param('Interface');

my $value;
my $Options ;
#-----------------------------------------------------------------------------------------	
		#Récupération des options du test
	#-----------------------------------------------------------------------------------------	

$Options = "traceroute";

$Options = $Options . " -i $Interface";

if ($OptionN eq 'true') 
{
$Options = $Options . " -n ";
}

if ($OptionW eq 'true') 
{
$Options = $Options . " -w $OptionWText";
}

if ($OptionP eq 'true') 
{
$Options = $Options . " -p $OptionPText";
}

if ($OptionM eq 'true') 
{
$Options = $Options . " --mtu $OptionMText";
}

if ($OptionF eq 'true') 
{
$Options = $Options . " -F ";
}

if ($OptionI eq 'true') 
{
$Options = $Options . " -i ";
}

if ($OptionT eq 'true') 
{
$Options = $Options . " -t ";
}

if ($OptionU eq 'true') 
{
$Options = $Options . " -u ";
}

$Options = $Options . " $lab ";


my $filename = 'pid.txt';
my $socket;
my $serverdata;
my $clientdata;
#-----------------------------------------------------------------------------------------	
		#Ouverture du port de communication avec le script serveur qui est chargé du lancement des tests
	#-----------------------------------------------------------------------------------------
$socket = new IO::Socket::INET (
  PeerHost => '127.0.0.1',
  PeerPort => '0160',
  Proto => 'tcp',
) or die "$!\n";


my $var = "";
#-----------------------------------------------------------------------------------------	
		#Envois de la commande avec les options
	#-----------------------------------------------------------------------------------------
print $socket "$Options";
shutdown($socket, 1);



$var = <$socket>; 
       

#-----------------------------------------------------------------------------------------	
		#Fermeture de la socket
	#-----------------------------------------------------------------------------------------

$socket->close();
 #-----------------------------------------------------------------------------------------	
		#Récupération des résultats du fichier temporaire et envois au Javascript
	#-----------------------------------------------------------------------------------------
my $filename = '/opt/lampp/htdocs/Stage2/resultats/tmp';
open(my $fh, '<:encoding(UTF-8)', $filename)
  or die "Could not open file '$filename' $!";
 
while (my $row = <$fh>) {
  chomp $row;
  print "$row\n";
}

$cgi->header('text/plain;charset=UTF-8');

