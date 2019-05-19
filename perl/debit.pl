#!/usr/bin/perl -w
	#Ce script sert à récupérer le débit d'envois
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
		#Initialisation de la communication avec JavaScript
	#-----------------------------------------------------------------------------------------	

my $param = $cgi->{param};
my $Interface = $cgi->param('Interface');
my $size;

#-----------------------------------------------------------------------------------------	
		#Définition de la socket de communication
	#-----------------------------------------------------------------------------------------	
my $socket;
my $serverdata;
my $clientdata;

$socket = new IO::Socket::INET (
  PeerHost => '127.0.0.1',
  PeerPort => '0168',
  Proto => 'tcp',
) or die "$!\n";


my $var = "";

my $Options = "ifstat -i $Interface 0.1 1";

#-----------------------------------------------------------------------------------------	
		#Envois de la commande à exécuter
	#-----------------------------------------------------------------------------------------	
print $socket "$Options";
shutdown($socket, 1);

$var = <$socket>; 
#-----------------------------------------------------------------------------------------	
		#Fermeture de la socket
	#-----------------------------------------------------------------------------------------	
$socket->close();

#-----------------------------------------------------------------------------------------	
		#Récupération des résultats du  débit et envois au javascript
	#-----------------------------------------------------------------------------------------	

my $line;
my $filename = '/opt/lampp/htdocs/QoStrouble/resultats/tmp2';
open(my $fh, '<:encoding(UTF-8)', $filename)
  or die "Could not open file '$filename' $!";
while (my $row = <$fh>) {
  chomp $row;
  $line = $row;
}

print $line;
$cgi->header('text/plain;charset=UTF-8');
#-----------------------------------------------------------------------------------------	
		#Fin du script
	#-----------------------------------------------------------------------------------------	


