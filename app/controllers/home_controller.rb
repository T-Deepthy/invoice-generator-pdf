class HomeController < ApplicationController
  def welcome
  end
  def print_invoice
    @cdetails = JSON.parse(params["cdetails"])
    @cldetails = JSON.parse(params["cldetails"])
    @items = JSON.parse(params["items"])
    @text1=JSON.parse(params["text1"])
    @text2=JSON.parse(params["text2"])
    respond_to do |format|
      format.html
      format.pdf do
        render pdf:
    params[:filename],
                      page_size: 'A4',
                      dpi: '300'
      end
    end
  end
end
