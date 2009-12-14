require 'test_helper'

class HGVMetaIdentifierTest < ActiveSupport::TestCase
  context "identifier mapping" do
    setup do
      @path_prefix = HGVMetaIdentifier::PATH_PREFIX
    end
    
    should "map the first identifier" do
      hgv1 = Factory.build(:HGVMetaIdentifier, :alternate_name => 'hgv1')
      assert_path_equal %w{HGV1 1.xml}, hgv1.to_path
    end
    
    should "map identifier subfolder edge cases to the correct subfolder" do
      hgv2000 = Factory.build(:HGVMetaIdentifier, :alternate_name => 'hgv2000')
      assert_path_equal %w{HGV2 2000.xml}, hgv2000.to_path
      
      hgv2001 = Factory.build(:HGVMetaIdentifier, :alternate_name => 'hgv2001')
      assert_path_equal %w{HGV3 2001.xml}, hgv2001.to_path
    end
    
    should "map identifiers with trailing characters" do
      hgv114252a = Factory.build(:HGVMetaIdentifier, :alternate_name => 'hgv114252a')
      assert_path_equal %w{HGV115 114252a.xml}, hgv114252a.to_path
      
      hgv23403zzr = Factory.build(:HGVMetaIdentifier, :alternate_name => 'hgv23403zzr')
      assert_path_equal %w{HGV24 23403zzr.xml}, hgv23403zzr.to_path
    end
  end
  
  context "identifier titleize" do
    should "correctly title identifiers with only a collection" do
      p_rev_laws = Factory.build(:HGVMetaIdentifier, :alternate_name => 'hgv30114', :name => 'oai:papyri.info:identifiers:hgv:P.Rev.%20Laws::')
      assert_equal p_rev_laws.titleize, 'P.Rev. Laws'
    end
  end
end