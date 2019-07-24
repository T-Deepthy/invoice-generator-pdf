class HomeController < ApplicationController
  def welcome
  end
  def print_invoice
    @cdetails = params["cdetails"] ? JSON.parse(params["cdetails"]) : []
    @cldetails = params["cldetails"] ? JSON.parse(params["cdetails"]) : []
    @items = params["items"] ? JSON.parse(params["cdetails"]) : []
    @text1=params["text1"] ? JSON.parse(params["cdetails"]) : []
    @text2=params["text2"] ? JSON.parse(params["cdetails"]) : []
    @footer=params["footer"] ? JSON.parse(params["cdetails"]) : []
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
