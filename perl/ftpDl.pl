#!/usr/bin/perl -w
	#Ce script sert à lancer un test ftp download
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

my $OptionM5 = $cgi->param('OptionM5');

my $OptionM100 = $cgi->param('OptionM100');

my $OptionG1 = $cgi->param('OptionG1');

my $Optionother = $cgi->param('Optionother');
my $OptionotherText = $cgi->param('OptionotherText');

my $OptionChemin = $cgi->param('OptionChemin');
my $OptionCheminText = $cgi->param('OptionCheminText');

my $value;
my $Options ;
my $size=0;

#-----------------------------------------------------------------------------------------	
		#Récupération des options du test
	#-----------------------------------------------------------------------------------------	


$Options = "cd /opt/lampp/htdocs/Qostrouble/Dl && lftp";

if ($OptionH1 eq 'true') 
{
$Options = $Options . " $OptionH1Text";
}
else
{
$Options = $Options . " anonymous";
}

if ($OptionH2 eq 'true') 
{
$Options = $Options . ":$OptionH2Text";
}
else
{
$Options = $Options . ":anonymous";
}

$Options = $Options . '@' . "$lab -e " . '"' ."set net:max-retries 1;set net:timeout 30; ";


if ($OptionM5 eq 'true') 
{
$Options = $Options . "get NetProTesterDownload/1M;bye" . '"'  ;
}

if ($OptionM100 eq 'true') 
{
$Options = $Options . "get NetProTesterDownload/100M;bye" . '"' ;
}

if ($OptionG1 eq 'true') 
{
$Options = $Options . "get NetProTesterDownload/1G;bye" . '"' ;
}

if ($OptionChemin eq 'true') 
{
$Options = $Options . "get $OptionCheminText;bye" . '"' ;
}


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
my $filename = '/opt/lampp/htdocs/QoStrouble/resultats/tmp';
open(my $fh, '<:encoding(UTF-8)', $filename)
  or die "Could not open file '$filename' $!";
while (my $row = <$fh>) {
  chomp $row;
  print "$row\n";
}

sleep 1;

system("rm -f /opt/lampp/htdocs/Qostrouble/Dl/*");






$cgi->header('text/plain;charset=UTF-8');


