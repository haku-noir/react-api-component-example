class TweetsController < ApplicationController
  def index
    tweets = Tweet.order(created_at: :desc)
    render json: { tweets: tweets }
  end

  def create
    @tweet = Tweet.new(content: params[:content])

    if @tweet.save
      render json: { tweet: @tweet }
    else
      render json: {}
    end
  end
end
