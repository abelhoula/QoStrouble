#!/usr/bin/perl -w
								#Ce script sert à lancer une capture tshark
		#Définition des bibliothèques utilisées 
	#-----------------------------------------------------------------------------------------							
use 5.012;
use CGI;
use URI::Escape;
use Carp; 
my $cgi = new CGI;
use utf8; 
use HTML::Entities;
#use Capture::Tiny 'capture_merged';
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

my $Interface = $cgi->param('Interface');

my $tsharkOfset = $cgi->param('tsharkOfset');

my $tsharkC = $cgi->param('tsharkC');
my $tsharkCText = $cgi->param('tsharkCText');

my $tsharkPcap = $cgi->param('tsharkPcap');

my $tsharkPcapng = $cgi->param('tsharkPcapng');

my $total = $cgi->param('total');

my $filter = $cgi->param('filter');

my $value;
my $Options ;

 #-----------------------------------------------------------------------------------------	
		#Récupération des options de la capture
	#-----------------------------------------------------------------------------------------	

if ($Interface!="")
{
$Options = $Options . " -i $Interface";
}


if ($tsharkOfset eq 'true') 
{
$Options = $Options . " -s 120";
}


if ($tsharkC eq 'true') 
{
$Options = $Options . " -c $tsharkCText";
}



if ($tsharkPcapng eq 'true') 
{
$Options = $Options . " -F pcapng";
}
else
{
$Options = $Options . " -F pcap";
}

$Options = $Options . " $filter";


my $filename = 'pid.txt';


my $socket;
my $serverdata;
my $clientdata;

 #-----------------------------------------------------------------------------------------	
		#Ouverture du port de communication avec le script serveur qui est chargé du lancement de la capture
	#-----------------------------------------------------------------------------------------	

$socket = new IO::Socket::INET (
  PeerHost => '127.0.0.1',
  PeerPort => '0158',
  Proto => 'tcp',
) or die "$!\n";


#-----------------------------------------------------------------------------------------	
		#Envois de la commande à lancer
	#-----------------------------------------------------------------------------------------	

print $socket "$Options";

#-----------------------------------------------------------------------------------------	
		#Fermeture de la socket
	#-----------------------------------------------------------------------------------------	

$socket->close();

#-----------------------------------------------------------------------------------------	
		#Envois des résultats au JavaScript
	#-----------------------------------------------------------------------------------------	

$cgi->header('text/plain;charset=UTF-8');

