#!/usr/bin/perl

print "USE wsutunnelapp;\n";

while(<>) {
  chomp;
  @nodeData = split /,/;
  $nodeData[1] =~ s/\\/\\\\/g;
  print "UPDATE nodes SET roomRegEx='$nodeData[1]' WHERE nodeID='$nodeData[0]';\n" if $nodeData[0] =~ /^\d+$/;
}