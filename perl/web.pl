#!/usr/bin/perl -w
#Ce script sert à lancer un test web browsing
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
print "Content-Type: text/html \n\n"; 
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

my $OptionH1 = $cgi->param('OptionH1');
my $OptionH1Text = $cgi->param('OptionH1Text');

my $OptionH2 = $cgi->param('OptionH2');
my $OptionH2Text = $cgi->param('OptionH2Text');

my $OptionN = $cgi->param('OptionN');

my $OptionD = $cgi->param('OptionD');

my $Option4P = $cgi->param('Option4P');

my $Option6P = $cgi->param('Option6P');

my $value;
my $Options ;
#-----------------------------------------------------------------------------------------	
		#Récupération des options du test
	#-----------------------------------------------------------------------------------------	

$Options = "/etc/init.d/dns-clean restart && wget --delete-after";

if ($OptionH1 eq 'true') 
{
$Options = $Options . " --http-user=$OptionH1Text";
}

if ($OptionH2 eq 'true') 
{
$Options = $Options . " --http-password=$OptionH2Text";
}

if ($OptionN eq 'true') 
{
$Options = $Options . " --no-cache";
}

if ($OptionD eq 'true') 
{
$Options = $Options . " -d";
}

if ($Option4P eq 'true') 
{
$Options = $Options . " -4";
}

if ($Option6P eq 'true') 
{
$Options = $Options . " -6";
}

$Options = $Options . ' "' . "$lab" . '"' . " 2";

#-----------------------------------------------------------------------------------------	
		#Ouverture du port de communication avec le script serveur qui est chargé du lancement des tests
	#-----------------------------------------------------------------------------------------
my $socket;
my $serverdata;
my $clientdata;

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


