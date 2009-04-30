class PublicationsController < ApplicationController
  layout 'site'
  
  # GET /publications
  # GET /publications.xml
  def index
    # @publications = Article.find(:all)
    @publications = []
    @branches = []
    if !@current_user.nil?
      @branches = @current_user.repository.branches
      @branches.delete("master")
      
      @publications = Publication.find_all_by_user_id(@current_user.id)
      # just give branches that don't have corresponding publications
      @branches -= @publications.map{|p| p.branch}
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @publications }
    end
  end
end