class Publication < ActiveRecord::Base
  validates_presence_of :title
  
  belongs_to :user
  has_and_belongs_to_many :identifiers
  
  validates_uniqueness_of :title, :scope => 'user_id'
  
  def after_create
    user.repository.create_branch(title)
  end
end
