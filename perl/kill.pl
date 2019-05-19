#!/usr/bin/perl -w
#Ce script sert à lacer la requete pour terminer la trace tshark
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
use HTML::Entities;
print "Content-Type: text/html \n\n";
use IO::Socket::INET;

#-----------------------------------------------------------------------------------------	
		#Définition des variables
	#-----------------------------------------------------------------------------------------	 

my $param = $cgi->{param};
my $Interface = $cgi->param('Interface');
my $size;

my $socket;
my $serverdata;
my $clientdata;
#-----------------------------------------------------------------------------------------	
		#Ouverture de la communication avec le serveur
	#-----------------------------------------------------------------------------------------	

$socket = new IO::Socket::INET (
  PeerHost => '127.0.0.1',
  PeerPort => '0169',
  Proto => 'tcp',
) or die "$!\n";


my $var = "";
#-----------------------------------------------------------------------------------------	
		#Récupération du PID du processus de la trace tshark
	#-----------------------------------------------------------------------------------------	
my $Options = "pgrep -u root tshark";
system("$Options > /opt/lampp/htdocs/Qostrouble/resultats/tmp3");
#-----------------------------------------------------------------------------------------	
		#Sauvegarde du résultat dans un fichier temporaire
	#-----------------------------------------------------------------------------------------	
my $line;
my $filename = '/opt/lampp/htdocs/Qostrouble/resultats/tmp3';
open(my $fh, '<:encoding(UTF-8)', $filename)
  or die "Could not open file '$filename' $!";
while (my $row = <$fh>) {
  chomp $row;
  $line = $row;
}

$Options = $line;
print $line;
#-----------------------------------------------------------------------------------------	
		#Envois du PID au serveur
	#-----------------------------------------------------------------------------------------	
print $socket "$Options";
shutdown($socket, 1);



$var = <$socket>; 
       
$socket->close();
#-----------------------------------------------------------------------------------------	
		#Fermeture de la connexion
	#-----------------------------------------------------------------------------------------	

$cgi->header('text/plain;charset=UTF-8');



