#!/usr/bin/perl -w
#!/usr/bin/perl -w
								#Ce script sert à lancer un test DNS
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
my $lab0 = $cgi->param('lab0');
my $lab = $cgi->param('lab');
my $OptionT = $cgi->param('OptionT');
my $OptionTText = $cgi->param('OptionTText');
my $OptionP = $cgi->param('OptionP');
my $OptionPText = $cgi->param('OptionPText');
my $Option4P = $cgi->param('Option4P');
my $Option6P = $cgi->param('Option6P');
my $value;
my $Options ;

#-----------------------------------------------------------------------------------------	
		#Récupération des options du test
	#-----------------------------------------------------------------------------------------	

$Options = "dig";

$Options = $Options . ' @'."$lab0";
$Options = $Options . " $lab";



if ($OptionT eq 'true') 
{
$Options = $Options . " -t $OptionTText";
}

if ($OptionP eq 'true') 
{
$Options = $Options . " -p $OptionPText";
}

if ($Option4P eq 'true') 
{
$Options = $Options . " -4";
}

if ($Option6P eq 'true') 
{
$Options = $Options . " -6";
}


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

