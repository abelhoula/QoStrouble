#!/usr/bin/perl -w
#Ce script sert à récupérer la taille totale d'un fichier qu'on souhaite télécharger en utilisant le protocole Http
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

my $OptionCheminText = $cgi->param('OptionCheminText');
my $value;
my $Options ;
#-----------------------------------------------------------------------------------------	
		#Commande à exécuter
	#-----------------------------------------------------------------------------------------	

$Options = "wget $lab$OptionCheminText --spider --server-response -O - 2>&1 | sed -ne '/Content-Length/{s/.*: //;p}'";

my $socket;
my $serverdata;
my $clientdata;
#-----------------------------------------------------------------------------------------	
		#Ouverture du port de communication avec le script serveur qui est chargé du calcul du débit
	#-----------------------------------------------------------------------------------------
$socket = new IO::Socket::INET (
  PeerHost => '127.0.0.1',
  PeerPort => '0168',
  Proto => 'tcp',
) or die "$!\n";


my $var = "";
#-----------------------------------------------------------------------------------------	
		#Envois de la commande
	#-----------------------------------------------------------------------------------------
print $socket "$Options";
shutdown($socket, 1);



$var = <$socket>; 
 #-----------------------------------------------------------------------------------------	
		#Fermeture de la socket
	#-----------------------------------------------------------------------------------------
$socket->close();
my $line;
my $filename = '/opt/lampp/htdocs/Stage2/resultats/tmp2';
open(my $fh, '<:encoding(UTF-8)', $filename)
  or die "Could not open file '$filename' $!";
while (my $row = <$fh>) {
  chomp $row;
  $line = $row;
}
#-----------------------------------------------------------------------------------------	
		#Récupération des résultats du fichier temporaire et envois au Javascript
	#-----------------------------------------------------------------------------------------
print $line;


$cgi->header('text/plain;charset=UTF-8');



