class HomeController < ApplicationController
  def welcome
  end
  def print_invoice
    @cdetails = params["cdetails"] ? JSON.parse(params["cdetails"]) : []
    @cldetails = params["cldetails"] ? JSON.parse(params["cldetails"]) : []
    @items = params["items"] ? JSON.parse(params["items"]) : []
    @text1=params["text1"] ? JSON.parse(params["text1"]) : []
    @text2=params["text2"] ? JSON.parse(params["text2"]) : []
    @footer=params["footer"] ? JSON.parse(params["footer"]) : []
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
