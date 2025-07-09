const reportService = require('../services/reportService');
const { formatResponse, asyncHandler } = require('../utils/helpers');

class ReportController {
  /**
   * POST /api/report/save
   * Save an analysis report to the database
   */
  saveReport = asyncHandler(async (req, res) => {
    const { website_url, analysis_result } = req.body;
    const userId = req.user.id; // User ID from authentication middleware

    console.log(`[${req.id}] Saving report for: ${website_url} (User: ${userId})`);

    const savedReport = await reportService.saveReport(
      website_url,
      analysis_result,
      userId
    );

    console.log(`[${req.id}] Report saved with ID: ${savedReport.id}`);

    res.status(201).json(
      formatResponse.success(
        {
          id: savedReport.id,
          website_url: savedReport.websiteUrl,
          created_at: savedReport.createdAt,
        },
        'Analysis report saved successfully'
      )
    );
  });

  /**
   * GET /api/report/list
   * Get all analysis reports with pagination
   */
  getAllReports = asyncHandler(async (req, res) => {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      websiteUrl
    } = req.query;

    const userId = req.user.id; // User ID from authentication middleware

    console.log(`[${req.id}] Fetching reports - Page: ${page}, Limit: ${limit} (User: ${userId})`);

    const result = await reportService.getAllReports({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder,
      userId,
      websiteUrl
    });

    res.status(200).json(
      formatResponse.success(
        {
          reports: result.reports,
          pagination: result.pagination,
        },
        'Reports retrieved successfully'
      )
    );
  });

  /**
   * GET /api/report/:id
   * Get a specific report by ID
   */
  getReportById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // User ID from authentication middleware

    console.log(`[${req.id}] Fetching report: ${id} (User: ${userId})`);

    const report = await reportService.getReportById(id, userId);

    if (!report) {
      return res.status(404).json(
        formatResponse.error('Report not found', 404)
      );
    }

    res.status(200).json(
      formatResponse.success(report, 'Report retrieved successfully')
    );
  });

  /**
   * GET /api/report/website/:websiteUrl
   * Get reports for a specific website
   */
  getReportsByWebsite = asyncHandler(async (req, res) => {
    const { websiteUrl } = req.params;
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const userId = req.user.id; // User ID from authentication middleware

    // Decode the URL parameter
    const decodedUrl = decodeURIComponent(websiteUrl);

    console.log(`[${req.id}] Fetching reports for website: ${decodedUrl} (User: ${userId})`);

    const result = await reportService.getReportsByWebsite(decodedUrl, {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder,
      userId
    });

    res.status(200).json(
      formatResponse.success(
        {
          website_url: decodedUrl,
          reports: result.reports,
          pagination: result.pagination,
        },
        'Website reports retrieved successfully'
      )
    );
  });

  /**
   * DELETE /api/report/:id
   * Delete a report by ID
   */
  deleteReport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // User ID from authentication middleware

    console.log(`[${req.id}] Deleting report: ${id} (User: ${userId})`);

    const success = await reportService.deleteReport(id, userId);

    if (!success) {
      return res.status(404).json(
        formatResponse.error('Report not found', 404)
      );
    }

    res.status(200).json(
      formatResponse.success(
        { deleted: true },
        'Report deleted successfully'
      )
    );
  });

  /**
   * PUT /api/report/:id
   * Update a report by ID
   */
  updateReport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { website_url, analysis_result } = req.body;
    const userId = req.user.id; // User ID from authentication middleware

    console.log(`[${req.id}] Updating report: ${id} (User: ${userId})`);

    const updateData = {};
    if (website_url) updateData.website_url = website_url;
    if (analysis_result) updateData.analysis_result = analysis_result;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json(
        formatResponse.error('No valid fields provided for update', 400)
      );
    }

    const updatedReport = await reportService.updateReport(id, updateData, userId);

    res.status(200).json(
      formatResponse.success(updatedReport, 'Report updated successfully')
    );
  });

  /**
   * GET /api/report/statistics
   * Get report statistics and analytics
   */
  getStatistics = asyncHandler(async (req, res) => {
    const userId = req.user.id; // User ID from authentication middleware

    console.log(`[${req.id}] Fetching report statistics (User: ${userId})`);

    const statistics = await reportService.getReportStatistics(userId);

    res.status(200).json(
      formatResponse.success(statistics, 'Report statistics retrieved successfully')
    );
  });

  /**
   * GET /api/report/search
   * Search reports by website URL
   */
  searchReports = asyncHandler(async (req, res) => {
    const {
      q: query,
      page = 1,
      limit = 10
    } = req.query;

    const userId = req.user.id; // User ID from authentication middleware

    if (!query) {
      return res.status(400).json(
        formatResponse.error('Search query is required', 400)
      );
    }

    console.log(`[${req.id}] Searching reports with query: ${query} (User: ${userId})`);

    const result = await reportService.searchReports(query, {
      page: parseInt(page),
      limit: parseInt(limit),
      userId
    });

    res.status(200).json(
      formatResponse.success(
        {
          query: result.query,
          reports: result.reports,
          pagination: result.pagination,
        },
        'Search completed successfully'
      )
    );
  });

  /**
   * GET /api/report/:id/download
   * Download a report as a text file
   */
  downloadReport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // User ID from authentication middleware

    console.log(`[${req.id}] Downloading report: ${id} (User: ${userId})`);

    try {
      const reportFile = await reportService.getReportFile(id, userId);

      if (!reportFile) {
        console.log(`[${req.id}] Report file not found: ${id}`);
        return res.status(404).json(
          formatResponse.error('Report file not found', 404)
        );
      }

      console.log(`[${req.id}] Report file found: ${reportFile.filename} (${reportFile.content.length} chars)`);

      // Set headers for file download
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${reportFile.filename}"`);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

      // Send the file content
      console.log(`[${req.id}] Sending report file: ${reportFile.filename}`);
      res.status(200).send(reportFile.content);
    } catch (error) {
      console.error(`[${req.id}] Error downloading report:`, error);
      return res.status(500).json(
        formatResponse.error('Failed to download report', 500)
      );
    }
  });
}

module.exports = new ReportController(); 